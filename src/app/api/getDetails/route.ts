import Cloudflare from "cloudflare";

export async function GET(req: Request) {
  const client = new Cloudflare({
    apiToken: process.env.CF_API_TOKEN,
  });

  try {
    const response = await client.kv.namespaces.bulkGet(
      process.env.CF_NAMESPACE_ID!,
      {
        account_id: process.env.CF_ACCOUNT_ID!,
        keys: ["socials"],
      }
    );

    console.log(response?.values);

    // Try several possible shapes to extract the socials string
    let socialsString = "";
    if (response?.values) {
      if (typeof response.values === "string") {
        socialsString = response.values;
      } else if (Array.isArray(response.values) && response.values[0]?.value) {
        socialsString = response.values[0].value;
      } else if (
        typeof response.values === "object" &&
        response.values.socials
      ) {
        socialsString = response.values.socials.toString();
      }
    }

    const socialsKeys = socialsString
      ? socialsString
          .split("###")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const socialsResult: Array<{ platform: string; url: string }> = [];
    let name = "";
    let rname = "";
    let location = "";

    for (const social of socialsKeys) {
      console.time("fetching social detail");
      const socialDetail = await client.kv.namespaces.bulkGet(
        process.env.CF_NAMESPACE_ID!,
        {
          account_id: process.env.CF_ACCOUNT_ID!,
          keys: [`social.${social}`],
        }
      );
      console.timeEnd("fetching social detail");
      console.log(socialDetail?.values);

      // Attempt to parse the returned value into a platform/url shape.
      let platform = social;
      let url: string | undefined;
      if (socialDetail?.values) {
        if (
          Array.isArray(socialDetail.values) &&
          socialDetail.values[0]?.value
        ) {
          const val = socialDetail.values[0].value;
          try {
            const parsed = JSON.parse(val);
            platform = parsed.platform ?? platform;
            url = parsed.url ?? url;
          } catch {
            // not JSON, treat as plain string
            url = val?.toString();
          }
        } else if (typeof socialDetail.values === "object") {
          // fallback: try to find a property containing a URL
          const maybe = Object.values(socialDetail.values)[0];
          if (maybe) url = maybe.toString();
        }
      }

      socialsResult.push({
        platform,
        url: url ?? `https://example.com/${encodeURIComponent(social)}`,
      });
    }

    console.time("fetching name and rei and location");
    const _name = await client.kv.namespaces.bulkGet(
      process.env.CF_NAMESPACE_ID!,
      {
        account_id: process.env.CF_ACCOUNT_ID!,
        keys: [`name`],
      }
    );
    name = _name?.values?.name?.toString() ?? "";
    const _rname = await client.kv.namespaces.bulkGet(
      process.env.CF_NAMESPACE_ID!,
      {
        account_id: process.env.CF_ACCOUNT_ID!,
        keys: [`nativeLangName`],
      }
    );
    rname = _rname?.values?.nativeLangName?.toString() ?? "";

    const _location = await client.kv.namespaces.bulkGet(
      process.env.CF_NAMESPACE_ID!,
      {
        account_id: process.env.CF_ACCOUNT_ID!,
        keys: [`location`],
      }
    );
    location = _location?.values?.location?.toString() ?? "";

    const _pfp = await client.kv.namespaces.bulkGet(
      process.env.CF_NAMESPACE_ID!,
      {
        account_id: process.env.CF_ACCOUNT_ID!,
        keys: [`pfp`],
      }
    );
    const pfp = _pfp?.values?.pfp?.toString() ?? "";

    console.timeEnd("fetching name, region, nativeLangName, pfp and location");

    const result = {
      name,
      nativeLangName: rname,
      location,
      pfp,
      socials: socialsResult,
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    console.error("Error in getDetails:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
