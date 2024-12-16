export async function POST(req: Request) {
  try {
    const body = await req.json();
    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
