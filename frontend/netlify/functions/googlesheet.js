const getScriptUrl = () => process.env.GOOGLE_SCRIPT_URL;
const buildTargetUrl = (baseUrl, queryParams = {}) => {
  const url = new URL(baseUrl);

  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
};

export async function handler(event) {
  const scriptUrl = getScriptUrl();

  if (!scriptUrl) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Missing GOOGLE_SCRIPT_URL environment variable",
      }),
    };
  }

  const method = event?.httpMethod || "GET";
  const queryParams = event?.queryStringParameters || {};
  const body = event?.isBase64Encoded
    ? Buffer.from(event.body || "", "base64").toString("utf8")
    : event?.body;

  const requestInit = {
    method,
    headers: {},
  };

  if (body && method !== "GET" && method !== "HEAD") {
    requestInit.body = body;
    requestInit.headers["Content-Type"] =
      event?.headers?.["content-type"] || "application/json";
  }

  try {
    const response = await fetch(buildTargetUrl(scriptUrl, queryParams), requestInit);
    const responseBody = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
      },
      body: responseBody,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Failed to reach Google Apps Script",
        details: error.message,
      }),
    };
  }
}
