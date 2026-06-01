export default {
  async fetch(request) {
    const incomingUrl = new URL(request.url);

    if (incomingUrl.hostname === "religioncompare.com") {
      incomingUrl.hostname = "www.religioncompare.com";
      return Response.redirect(incomingUrl.toString(), 308);
    }

    const upstreamUrl = new URL(request.url);
    upstreamUrl.hostname = "religionhub.clockedoutlockedin.workers.dev";
    upstreamUrl.protocol = "https:";

    const headers = new Headers(request.headers);
    headers.set("x-forwarded-host", incomingUrl.host);
    headers.set("x-forwarded-proto", incomingUrl.protocol.replace(":", ""));
    headers.set("x-forwarded-for", headers.get("cf-connecting-ip") ?? "");

    const upstreamRequest = new Request(upstreamUrl, {
      method: request.method,
      headers,
      body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
      redirect: "manual",
    });

    return fetch(upstreamRequest);
  },
};
