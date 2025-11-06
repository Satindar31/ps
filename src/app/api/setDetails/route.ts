import Cloudflare from "cloudflare";

export async function POST(req: Request) {
  const client = new Cloudflare({
    apiToken: process.env.CF_API_TOKEN,
  });
  const { name, nativeLangName, location } = await req.json();

  try {
    await client.kv.namespaces.bulkUpdate(
      process.env.CF_NAMESPACE_ID!,
      {
        account_id: process.env.CF_ACCOUNT_ID!,
        body: [
          {
            key: "name",
            value: name,
          },
          {
            key: "nativeLangName",
            value: nativeLangName,
          },
          {
            key: "location",
            value: location,
          },
        ],
      }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Error in getDetails:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
