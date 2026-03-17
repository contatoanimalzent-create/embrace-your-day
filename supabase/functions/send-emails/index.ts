import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = "re_XyHYiKpb_Ahh7p1TX2q7XsdosTMnP7sxV";
const ADMIN_EMAIL = "institutonacionalids@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev";

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });
  return res.json();
}

serve(async (req) => {
  const { type, record } = await req.json();

  if (type === "exhibitor") {
    const clientEmail = record.email;
    const clientName = record.full_name || record.razao_social || "Expositor";

    // Email para o admin
    await sendEmail(
      ADMIN_EMAIL,
      `🎪 Novo cadastro de expositor: ${clientName}`,
      `
        <h2>Novo cadastro de expositor recebido!</h2>
        <p><strong>Nome:</strong> ${clientName}</p>
        <p><strong>Email:</strong> ${clientEmail}</p>
        <p><strong>Telefone:</strong> ${record.phone}</p>
        <p><strong>Segmento:</strong> ${record.segment}</p>
        <p><strong>Instagram:</strong> ${record.instagram}</p>
        <p><strong>Cidade:</strong> ${record.city} / ${record.state}</p>
        <br/>
        <p>Acesse o <a href="https://supabase.com/dashboard/project/pthfgufytkdvdgksqots">painel do Supabase</a> para ver todos os detalhes.</p>
      `
    );

    // Email de confirmação para o cliente
    if (clientEmail) {
      await sendEmail(
        clientEmail,
        `✅ Cadastro recebido — Capital Mix`,
        `
          <h2>Olá, ${clientName}! 🎉</h2>
          <p>Recebemos seu cadastro para o <strong>Capital Mix</strong> e em breve nossa equipe entrará em contato.</p>
          <br/>
          <p><strong>Resumo do seu cadastro:</strong></p>
          <p>📍 Segmento: ${record.segment}</p>
          <p>📱 Instagram: ${record.instagram}</p>
          <p>🏙️ Cidade: ${record.city} / ${record.state}</p>
          <br/>
          <p>Qualquer dúvida, entre em contato pelo WhatsApp: <strong>(61) 99307-3003</strong></p>
          <br/>
          <p>Até breve,<br/>Equipe Capital Mix</p>
        `
      );
    }
  }

  if (type === "contact") {
    const clientEmail = record.email;
    const clientName = record.name;

    // Email para o admin
    await sendEmail(
      ADMIN_EMAIL,
      `📩 Nova mensagem de contato: ${clientName}`,
      `
        <h2>Nova mensagem de contato!</h2>
        <p><strong>Nome:</strong> ${clientName}</p>
        <p><strong>Email:</strong> ${clientEmail}</p>
        <p><strong>Telefone:</strong> ${record.phone || "—"}</p>
        <p><strong>Assunto:</strong> ${record.subject}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${record.message}</p>
      `
    );

    // Email de confirmação para o cliente
    if (clientEmail) {
      await sendEmail(
        clientEmail,
        `✅ Mensagem recebida — Capital Mix`,
        `
          <h2>Olá, ${clientName}!</h2>
          <p>Recebemos sua mensagem e responderemos em breve.</p>
          <br/>
          <p><strong>Assunto:</strong> ${record.subject}</p>
          <p><strong>Sua mensagem:</strong></p>
          <p>${record.message}</p>
          <br/>
          <p>Qualquer dúvida, entre em contato pelo WhatsApp: <strong>(61) 99307-3003</strong></p>
          <br/>
          <p>Até breve,<br/>Equipe Capital Mix</p>
        `
      );
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});