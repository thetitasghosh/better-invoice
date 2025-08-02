// app/api/send-invoice/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email, subject, base64Pdf, invoiceNo } = await req.json();
  // console.log("sending to api", {
  //   email,
  //   subject,
  //   base64Pdf,
  //   invoiceNo,
  // });

  try {
    const data = await resend.emails.send({
      // from: "Invoice <invoice@titasghosh.com>",
      from: "Invoice <send@invoice.titasghosh.com>",
      to: [email],
      subject,
      html: `<p>Hello, please find attached your invoice <strong>${invoiceNo}</strong>.</p>`,
      attachments: [
        {
          filename: `Invoice-${invoiceNo}.pdf`,
          content: base64Pdf,
          contentType: "application/pdf", // ✅ Required
        },
      ],
    });
    // console.log("success", data);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
