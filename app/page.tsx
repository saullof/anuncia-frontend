"use client";

import { useEffect, useMemo, useState } from "react";

type IconName =
  | "arrow" | "back" | "briefcase" | "campaign" | "chart" | "check" | "chevron"
  | "clock" | "eye" | "home" | "image" | "location" | "megaphone" | "menu"
  | "message" | "money" | "people" | "phone" | "plus" | "rocket" | "shield"
  | "spark" | "store" | "target" | "user" | "users" | "wallet" | "whatsapp";

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></>,
    back: <><path d="m15 18-6-6 6-6"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/></>,
    campaign: <><path d="M4 13V8l14-4v13L4 13Z"/><path d="M8 14v5a2 2 0 0 1-4 0v-6M18 8.5a3.5 3.5 0 0 1 0 6"/></>,
    chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="3"/><path d="m3 16 5-5 4 4 3-3 6 6"/><path d="M16 9h.01"/></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    megaphone: <><path d="M3 12v-2l15-5v12L3 12Z"/><path d="M7 13v5a2 2 0 0 1-4 0v-6"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-5A8 8 0 1 1 21 15Z"/></>,
    money: <><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M7 9H6a1 1 0 0 1-1-1M17 15h1a1 1 0 0 1 1 1"/></>,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2.1Z"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    rocket: <><path d="M14 4c3-3 6-2 6-2s1 3-2 6l-6 6-4-4 6-6Z"/><path d="M8 10H5l-3 3 5 1M12 14v3l-3 3-1-5M15 7h.01"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
    spark: <><path d="m12 3 1.2 4.3L17.5 8.5l-4.3 1.2L12 14l-1.2-4.3-4.3-1.2 4.3-1.2L12 3ZM18.5 14l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z"/></>,
    store: <><path d="M3 10h18M5 10v11h14V10M8 21v-6h4v6M3 10l2-6h14l2 6"/><path d="M3 10a3 3 0 0 0 5 2 3 3 0 0 0 4 0 3 3 0 0 0 4 0 3 3 0 0 0 5-2"/></>,
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    users: <><path d="M15 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M17 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87"/></>,
    wallet: <><path d="M4 6h15a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h13v3M16 12h5"/></>,
    whatsapp: <><path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-4.5A8.5 8.5 0 1 1 20.5 11.5Z"/><path d="M8.2 7.8c.4 3 2 4.7 5.1 5.8l1.3-1.3 2.1 1c-.4 2.1-1.9 2.6-3.6 2.2-4.6-1.2-7-3.8-7.4-7.2-.2-1.5.7-2.6 2.2-2.8l.3 2.3Z"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

type View = "onboarding" | "client" | "admin";
type FormState = {
  destination: "whatsapp" | "instagram";
  customerPhone: string;
  sessionId: string;
  business: string;
  category: string;
  productOrService: string;
  targetCustomer: string;
  mainDifferential: string;
  specialCondition: string;
  city: string;
  radius: number;
  age: string;
  packageId: "start" | "grow" | "highlight";
};

type CreativeOption = {
  id: string;
  index: number;
  image_url: string;
  primary_text: string;
  headline: string;
};

type CreativeMode = "ai" | "upload" | "";

const plans = [
  { id: "start" as const, price: 97, label: "Para começar", reach: "4 a 7 mil" },
  { id: "grow" as const, price: 149, label: "Mais escolhido", reach: "8 a 13 mil" },
  { id: "highlight" as const, price: 187, label: "Mais destaque", reach: "14 a 20 mil" },
];

const initialForm: FormState = {
  destination: "whatsapp",
  customerPhone: "",
  sessionId: "",
  business: "",
  category: "",
  productOrService: "",
  targetCustomer: "",
  mainDifferential: "",
  specialCondition: "",
  city: "",
  radius: 10,
  age: "30 a 60 anos",
  packageId: "grow",
};

const questionnaireExamples: Record<string, string[]> = {
  Advocacia: ["Consultoria empresarial", "Pequenos empresários", "Atendimento online", "Primeira conversa grátis"],
  Saúde: ["Consulta particular", "Adultos da região", "Horários aos sábados", "Avaliação com desconto"],
  Loja: ["Nova coleção feminina", "Mulheres da região", "Entrega rápida", "A partir de R$ 59"],
  Serviços: ["Manutenção elétrica", "Moradores da região", "Atendimento no mesmo dia", "Orçamento grátis"],
};

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <div className={inverse ? "brand inverse" : "brand"}><span className="brand-symbol"><i/><b/></span><span>anunc<span>IA</span></span></div>;
}

function TopBar({ view }: { view: View }) {
  return (
    <header className="topbar">
      <Brand />
      <div className="profile-chip"><span>SF</span><div><b>Saulo Fernandes</b><small>{view === "admin" ? "Administrador" : "Minha conta"}</small></div></div>
    </header>
  );
}

function StepShell({ step, title, subtitle, onBack, children, action, actionDisabled = false, actionLabel = "Continuar" }: { step: number; title: string; subtitle: string; onBack?: () => void; children: React.ReactNode; action: () => void; actionDisabled?: boolean; actionLabel?: string }) {
  return (
    <div className="onboarding-page">
      <div className="progress-head">
        <button className="back-link" onClick={onBack} disabled={!onBack}><Icon name="back" size={18}/> Voltar</button>
        <span>Etapa {step} de 5</span>
        <button className="help-link"><Icon name="message" size={17}/> Precisa de ajuda?</button>
      </div>
      <div className="progress-track"><span style={{ width: `${(step / 5) * 100}%` }}/></div>
      <section className="step-card">
        <div className="step-copy"><span className="step-kicker">VAMOS CRIAR SEU ANÚNCIO</span><h1>{title}</h1><p>{subtitle}</p></div>
        <div className="step-body">{children}</div>
        <div className="step-action"><button className="primary" disabled={actionDisabled} onClick={action}>{actionLabel} <Icon name="arrow" size={19}/></button><small>Leva menos de 3 minutos</small></div>
      </section>
    </div>
  );
}

const generationStages = [
  { title: "Organizando seu briefing", detail: "Transformando suas respostas em uma direção criativa clara.", progress: 18 },
  { title: "Escrevendo a mensagem do anúncio", detail: "Criando textos simples, diretos e adequados ao seu público.", progress: 36 },
  { title: "Desenhando três propostas visuais", detail: "Cada opção está sendo criada especialmente para o seu negócio.", progress: 62 },
  { title: "Revisando conteúdo e qualidade", detail: "Conferindo clareza, aparência e políticas de publicidade.", progress: 82 },
  { title: "Finalizando suas opções", detail: "Estamos nos últimos ajustes. Falta muito pouco.", progress: 94 },
];

function CreativeLoading({ business, stage }: { business: string; stage: number }) {
  const current = generationStages[Math.min(stage, generationStages.length - 1)];

  return (
    <div className="creative-loading-page" role="status" aria-live="polite">
      <div className="creative-loading-card">
        <div className="loading-brand"><Brand /><span>CRIANDO PARA {business || "SEU NEGÓCIO"}</span></div>
        <div className="loading-visual" aria-hidden="true">
          <div className="loading-orbit"><span/><i/><b/></div>
          <div className="loading-spark"><Icon name="spark" size={28}/></div>
          <div className="loading-mini-card card-one"><span/><b/><i/></div>
          <div className="loading-mini-card card-two"><span/><b/><i/></div>
          <div className="loading-mini-card card-three"><span/><b/><i/></div>
        </div>
        <div className="loading-copy">
          <span>A IA ESTÁ TRABALHANDO AGORA</span>
          <h1>{current.title}</h1>
          <p>{current.detail}</p>
        </div>
        <div className="loading-progress" aria-label={`${current.progress}% concluído`}>
          <div><span style={{ width: `${current.progress}%` }}/></div>
          <b>{current.progress}%</b>
        </div>
        <div className="loading-steps">
          {generationStages.map((item, index) => (
            <div key={item.title} className={index < stage ? "done" : index === stage ? "active" : ""}>
              <span>{index < stage ? <Icon name="check" size={13}/> : index + 1}</span>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
        <div className="loading-note"><Icon name="clock" size={17}/><span><b>Você não precisa atualizar a página.</b> Normalmente isso leva entre 1 e 3 minutos.</span></div>
      </div>
    </div>
  );
}

function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState(0);
  const [creativeMode, setCreativeMode] = useState<CreativeMode>("");
  const [creativeOptions, setCreativeOptions] = useState<CreativeOption[]>([]);
  const [selectedCreativeId, setSelectedCreativeId] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [uploadedImageName, setUploadedImageName] = useState("");
  const [submitError, setSubmitError] = useState("");
  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((current) => ({ ...current, [key]: value }));
  const plan = plans.find((item) => item.id === form.packageId)!;
  const forward = () => setStep((current) => Math.min(5, current + 1));
  const back = step > 1 ? () => setStep((current) => current - 1) : undefined;
  const phoneDigits = form.customerPhone.replace(/\D/g, "");
  const examples = questionnaireExamples[form.category] || questionnaireExamples.Serviços;
  const offerDescription = [
    `Produto ou serviço: ${form.productOrService.trim()}.`,
    `Público: ${form.targetCustomer.trim()}.`,
    `Diferencial: ${form.mainDifferential.trim()}.`,
    form.specialCondition.trim() ? `Condição especial: ${form.specialCondition.trim()}.` : "",
  ].filter(Boolean).join(" ");
  const requiredAnswers = [form.productOrService, form.targetCustomer, form.mainDifferential];
  const answeredRequired = requiredAnswers.filter((value) => value.trim()).length;
  const briefingItems = [
    { label: "Oferta", value: form.productOrService, icon: "campaign" as IconName },
    { label: "Público", value: form.targetCustomer, icon: "users" as IconName },
    { label: "Diferencial", value: form.mainDifferential, icon: "spark" as IconName },
    { label: "Condição", value: form.specialCondition, icon: "money" as IconName, optional: true },
  ];

  const selectedCreative = creativeOptions.find((option) => option.id === selectedCreativeId) || creativeOptions[0];

  useEffect(() => {
    if (!generating) return;

    const interval = window.setInterval(() => {
      setGenerationStage((current) => Math.min(generationStages.length - 1, current + 1));
    }, 6500);

    return () => window.clearInterval(interval);
  }, [generating]);

  const selectUploadedImage = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSubmitError("Escolha um arquivo de imagem válido.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setSubmitError("A imagem deve ter no máximo 8 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(String(reader.result || ""));
      setUploadedImageName(file.name);
      setSubmitError("");
    };
    reader.readAsDataURL(file);
  };

  const submitOnboarding = async () => {
    setSubmitting(true);
    setSubmitError("");

    try {
      let sessionId = form.sessionId;

      if (!sessionId) {
        const response = await fetch("/api/onboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer_phone: phoneDigits,
            business_name: form.business.trim(),
            niche_category: form.category,
            offer_description: offerDescription,
          }),
        });
        const responseText = await response.text();
        let data: { ok?: boolean; session_id?: string; error?: string };

        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error("O servidor está temporariamente indisponível. Tente novamente em instantes.");
        }

        if (!response.ok || !data.ok || !data.session_id) {
          throw new Error(data.error || "Não foi possível salvar seus dados agora.");
        }

        sessionId = data.session_id;
        update("sessionId", sessionId);
      }

      if (creativeMode === "upload") {
        if (!uploadedImage) throw new Error("Envie a imagem que deseja utilizar.");

        const uploadResponse = await fetch("/api/creative/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: sessionId,
            image_data_url: uploadedImage,
            file_name: uploadedImageName,
          }),
        });
        const uploadResponseText = await uploadResponse.text();
        let uploadData: { ok?: boolean; error?: string; options?: CreativeOption[] };

        try {
          uploadData = JSON.parse(uploadResponseText);
        } catch {
          throw new Error("O envio da imagem retornou uma resposta inválida.");
        }

        if (!uploadResponse.ok || !uploadData.ok || !uploadData.options?.length) {
          throw new Error(uploadData.error || "Não foi possível enviar sua imagem agora.");
        }

        setCreativeOptions(uploadData.options);
        setSelectedCreativeId(uploadData.options[0].id);
        setStep(3);
        return;
      }

      setGenerationStage(0);
      setGenerating(true);

      const creativeResponse = await fetch("/api/creative/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const creativeResponseText = await creativeResponse.text();
      let creativeData: { ok?: boolean; error?: string; options?: CreativeOption[] };

      try {
        creativeData = JSON.parse(creativeResponseText);
      } catch {
        throw new Error("O gerador retornou uma resposta inválida.");
      }

      if (!creativeResponse.ok || !creativeData.ok || !creativeData.options?.length) {
        throw new Error(creativeData.error || "Não foi possível gerar seus criativos agora.");
      }

      setCreativeOptions(creativeData.options);
      setSelectedCreativeId(creativeData.options[0].id);
      setStep(3);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Não foi possível salvar seus dados agora.");
    } finally {
      setGenerating(false);
      setSubmitting(false);
    }
  };

  if (generating) return <CreativeLoading business={form.business} stage={generationStage}/>;

  if (step === 1) return <StepShell step={1} title="Qual é o nome do seu negócio?" subtitle="Vamos começar pelo básico. Você não precisa entender de anúncios." action={forward} actionDisabled={!form.business.trim() || !form.category || phoneDigits.length < 10}>
    <div className="simple-form">
      <label>Nome do negócio<input value={form.business} onChange={(event) => update("business", event.target.value)} placeholder="Ex.: Clínica Sorriso"/></label>
      <label>Seu WhatsApp<input type="tel" inputMode="tel" value={form.customerPhone} onChange={(event) => update("customerPhone", event.target.value)} placeholder="Ex.: 5521999990001"/><span className="field-hint">Use DDI e DDD. Ex.: 5521999990001</span></label>
      <label>Show! Qual é o seu ramo?<div className="segment-grid">{[
        ["Advocacia", "briefcase"], ["Saúde", "people"], ["Loja", "store"], ["Serviços", "user"]
      ].map(([label, icon]) => <button key={label} className={form.category === label ? "selected" : ""} onClick={() => update("category", label)}><Icon name={icon as IconName} size={23}/>{label}<span>{form.category === label && <Icon name="check" size={13}/>}</span></button>)}</div></label>
    </div>
  </StepShell>;

  if (step === 2) return <StepShell step={2} title="Vamos montar seu anúncio juntos" subtitle="Você responde e escolhe se quer uma arte nova ou utilizar uma imagem que já possui." onBack={back} action={submitOnboarding} actionDisabled={!form.productOrService.trim() || !form.targetCustomer.trim() || !form.mainDifferential.trim() || !creativeMode || (creativeMode === "upload" && !uploadedImage) || submitting} actionLabel={submitting ? "Preparando..." : creativeMode === "upload" ? "Continuar com minha imagem" : "Gerar meus criativos"}>
    <div className="simple-form offer-form">
      <div className="briefing-layout">
        <div className="question-grid">
          <label className={`question-card ${form.productOrService.trim() ? "answered" : ""}`}><span><b>1</b> O que você quer anunciar?{form.productOrService.trim() && <i><Icon name="check" size={13}/></i>}</span><input value={form.productOrService} onChange={(event) => update("productOrService", event.target.value)} placeholder={`Ex.: ${examples[0]}`} maxLength={100}/></label>
          <label className={`question-card ${form.targetCustomer.trim() ? "answered" : ""}`}><span><b>2</b> Quem costuma contratar ou comprar?{form.targetCustomer.trim() && <i><Icon name="check" size={13}/></i>}</span><input value={form.targetCustomer} onChange={(event) => update("targetCustomer", event.target.value)} placeholder={`Ex.: ${examples[1]}`} maxLength={100}/></label>
          <label className={`question-card ${form.mainDifferential.trim() ? "answered" : ""}`}><span><b>3</b> Qual é o seu principal diferencial?{form.mainDifferential.trim() && <i><Icon name="check" size={13}/></i>}</span><input value={form.mainDifferential} onChange={(event) => update("mainDifferential", event.target.value)} placeholder={`Ex.: ${examples[2]}`} maxLength={120}/></label>
          <label className={`question-card ${form.specialCondition.trim() ? "answered" : ""}`}><span><b>4</b> Tem alguma oferta especial? <em>Opcional</em>{form.specialCondition.trim() && <i><Icon name="check" size={13}/></i>}</span><input value={form.specialCondition} onChange={(event) => update("specialCondition", event.target.value)} placeholder={`Ex.: ${examples[3]}`} maxLength={100}/></label>
        </div>
        <aside className="briefing-preview">
          <div className="briefing-preview-head"><span><Icon name="spark" size={16}/> SEU BRIEFING</span><b>{answeredRequired}/3 essenciais</b></div>
          <div className="briefing-progress"><span style={{width: `${(answeredRequired / 3) * 100}%`}}/></div>
          <h3>Seu anúncio está tomando forma</h3>
          <div className="briefing-list">{briefingItems.map((item) => <div className={item.value.trim() ? "filled" : ""} key={item.label}><span><Icon name={item.icon} size={15}/></span><p><small>{item.label}{item.optional ? " · opcional" : ""}</small><b>{item.value.trim() || "Aguardando resposta"}</b></p></div>)}</div>
          <footer><Icon name="shield" size={15}/> Suas respostas serão organizadas automaticamente.</footer>
        </aside>
      </div>
      <div className="destination-box"><strong>Onde as pessoas podem falar com você?</strong><div>{[
        ["whatsapp", "/whatsapp.svg", "WhatsApp"], ["instagram", "/instagram.svg", "Instagram"]
      ].map(([value, logo, label]) => <button key={value} className={form.destination === value ? "selected" : ""} onClick={() => update("destination", value as FormState["destination"])}><img className="channel-logo" src={logo} alt=""/>{label}</button>)}</div></div>
      <section className="creative-source-box">
        <div className="creative-source-heading"><span><Icon name="image" size={19}/></span><div><h3>Como você quer criar a arte?</h3><p>Escolha antes de continuar. Se você já possui uma imagem, não utilizaremos a geração por IA.</p></div></div>
        <div className="creative-source-grid">
          <button type="button" className={creativeMode === "ai" ? "selected" : ""} onClick={() => { setCreativeMode("ai"); setSubmitError(""); }}>
            <span><Icon name="spark" size={23}/></span><div><b>Criar com a AnuncIA</b><small>Receba 3 opções feitas para o seu negócio.</small></div><i>{creativeMode === "ai" && <Icon name="check" size={13}/>}</i>
          </button>
          <button type="button" className={creativeMode === "upload" ? "selected" : ""} onClick={() => { setCreativeMode("upload"); setSubmitError(""); }}>
            <span><Icon name="image" size={23}/></span><div><b>Usar minha própria arte</b><small>Envie uma imagem pronta e pule a geração.</small></div><i>{creativeMode === "upload" && <Icon name="check" size={13}/>}</i>
          </button>
        </div>
        {creativeMode === "upload" && <label className={uploadedImage ? "creative-upload has-file" : "creative-upload"}>
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => selectUploadedImage(event.target.files?.[0])}/>
          {uploadedImage ? <><img src={uploadedImage} alt="Prévia da arte enviada"/><span><b>{uploadedImageName}</b><small>Clique para substituir a imagem</small></span><Icon name="check" size={19}/></> : <><span className="upload-icon"><Icon name="plus" size={23}/></span><span><b>Enviar minha imagem</b><small>PNG, JPG ou WEBP · máximo de 8 MB</small></span></>}
        </label>}
      </section>
      {submitError && <div className="form-error" role="alert">{submitError}</div>}
    </div>
  </StepShell>;

  if (step === 3 && selectedCreative) return <StepShell step={3} title="Seu anúncio está pronto" subtitle={creativeMode === "ai" ? "Criamos opções exclusivas para você escolher." : "Veja como sua imagem aparecerá no anúncio."} onBack={back} action={forward}>
    <div className="creative-layout">
      <div className="ad-preview">
        <div className="ad-head"><span className="ad-avatar">F</span><div><b>{form.business}</b><small>Patrocinado</small></div><strong>•••</strong></div>
        <p>{selectedCreative.primary_text || offerDescription}</p>
        <div className="generated-ad-art"><img src={selectedCreative.image_url} alt="Arte selecionada para o anúncio"/></div>
        <div className="ad-cta"><span><small>FALE COM NOSSA EQUIPE</small><b>{selectedCreative.headline || form.productOrService.slice(0, 48)}</b></span><button>Enviar mensagem</button></div>
      </div>
      <div className="creative-controls">
        <span className="approved"><Icon name="shield" size={20}/><b>{creativeMode === "ai" ? "Conteúdo verificado pelo AnuncIA" : "Sua arte foi adicionada"}</b></span>
        <h3>{creativeMode === "ai" ? "Qual opção você prefere?" : "Gostou da prévia?"}</h3>
        {creativeMode === "ai" ? <div className="creative-tabs">{creativeOptions.map((option, position) => <button key={option.id} className={selectedCreativeId === option.id ? "selected" : ""} onClick={() => setSelectedCreativeId(option.id)}>Opção {position + 1}{selectedCreativeId === option.id && <Icon name="check" size={14}/>}</button>)}</div> : <div className="own-art-summary"><Icon name="image" size={20}/><span><b>{uploadedImageName}</b><small>Imagem enviada por você</small></span></div>}
        <p>A aprovação final do anúncio será realizada pela Meta.</p>
        {creativeMode === "upload" && <button className="secondary" onClick={() => setStep(2)}><Icon name="image" size={18}/> Trocar minha imagem</button>}
      </div>
    </div>
  </StepShell>;

  if (step === 3) return <StepShell step={3} title="Não encontramos a arte selecionada" subtitle="Volte uma etapa para escolher como deseja criar o anúncio." onBack={back} action={() => setStep(2)} actionLabel="Voltar para escolher">
    <div className="form-error" role="alert">A prévia não está disponível. Sua sessão foi preservada e você pode tentar novamente.</div>
  </StepShell>;

  if (step === 4) return <StepShell step={4} title="Onde estão seus clientes?" subtitle="Escolha a região. O restante nós ajustamos para você." onBack={back} action={forward}>
    <div className="audience-layout">
      <div className="simple-form">
        <label>Cidade ou bairro<div className="input-icon"><Icon name="location" size={20}/><input value={form.city} onChange={(event) => update("city", event.target.value)}/></div></label>
        <label>Distância<div className="pill-options">{[5, 10, 20, 30].map((radius) => <button key={radius} className={form.radius === radius ? "selected" : ""} onClick={() => update("radius", radius)}>{radius} km</button>)}</div></label>
        <label>Idade principal<select value={form.age} onChange={(event) => update("age", event.target.value)}><option>18 a 35 anos</option><option>25 a 50 anos</option><option>30 a 60 anos</option><option>Todas as idades</option></select></label>
      </div>
      <aside className="estimate-card"><span><Icon name="target" size={22}/></span><small>PÚBLICO NA SUA REGIÃO</small><strong>Alcance calculado no próximo passo</strong><p>Usaremos {form.city}, em um raio de {form.radius} km, para divulgar seu negócio.</p><div><Icon name="spark" size={17}/> Ajustado automaticamente</div></aside>
    </div>
  </StepShell>;

  return <StepShell step={5} title="Até quantas pessoas você quer alcançar?" subtitle="Escolha um pacote fechado. O valor já inclui a divulgação e toda a gestão." onBack={back} action={onComplete}>
    <div className="plan-grid">{plans.map((item) => <button key={item.id} className={form.packageId === item.id ? "plan selected" : "plan"} onClick={() => update("packageId", item.id)}>{item.id === "grow" && <em>MAIS ESCOLHIDO</em>}<span>{item.label}</span><strong><small>R$</small>{item.price}<small>,00</small></strong><p>Alcance estimado entre {item.reach} pessoas</p><i>{form.packageId === item.id ? <Icon name="check" size={15}/> : null}</i></button>)}</div>
    <div className="order-summary"><div><span>Divulgação</span><b>Alcance estimado de {plan.reach} pessoas</b></div><div><span>Região</span><b>{form.city} · {form.radius} km</b></div><div><span>Valor total</span><strong>R$ {plan.price},00</strong></div><small><Icon name="shield" size={15}/> Pagamento único e seguro por Pix ou cartão</small></div>
  </StepShell>;
}

const clientCampaigns = [
  { name: "Apresentação da Fernandes Advocacia", goal: "Divulgação local", status: "Em andamento", metric: "8.420 pessoas", progress: 62, days: "6 dias restantes" },
  { name: "Consulta para pequenas empresas", goal: "Divulgação local", status: "Finalizada", metric: "12.760 pessoas", progress: 100, days: "Finalizada em 29 jul" },
];

function DashboardShell({ admin, onNavigate, children }: { admin?: boolean; onNavigate: (view: View) => void; children: React.ReactNode }) {
  return <div className="dashboard-shell"><aside className="side-nav"><Brand inverse/><nav><button className="active"><Icon name="home"/> Visão geral</button>{admin ? <><button><Icon name="users"/> Clientes</button><button><Icon name="campaign"/> Campanhas</button><button><Icon name="money"/> Pagamentos</button><button><Icon name="shield"/> Moderação</button></> : <><button><Icon name="campaign"/> Meus anúncios</button><button onClick={() => onNavigate("onboarding")}><Icon name="plus"/> Criar anúncio</button><button><Icon name="wallet"/> Pagamentos</button></>}</nav><div className="side-help"><Icon name="message"/><b>Precisa de ajuda?</b><p>Fale com nosso suporte.</p><button>Chamar no WhatsApp</button></div><div className="side-profile"><span>{admin ? "SF" : "FA"}</span><div><b>{admin ? "Saulo Fernandes" : "Fernandes Advocacia"}</b><small>{admin ? "Administrador" : "Conta do cliente"}</small></div></div></aside><main className="dash-main">{children}</main></div>;
}

function ClientDashboard({ onNavigate }: { onNavigate: (view: View) => void }) {
  return <DashboardShell onNavigate={onNavigate}><header className="dash-header"><button className="mobile-menu"><Icon name="menu"/></button><div><span>MINHA CONTA</span><h1>Olá, Fernandes Advocacia</h1><p>Acompanhe seus anúncios de um jeito simples.</p></div><button className="primary" onClick={() => onNavigate("onboarding")}><Icon name="plus" size={18}/> Criar novo anúncio</button></header><section className="dash-content">
    <div className="simple-metrics"><article className="highlight"><span><Icon name="people"/></span><div><small>Pessoas alcançadas</small><strong>21.840</strong><p><b>+18%</b> nos últimos 30 dias</p></div></article><article><span><Icon name="message"/></span><div><small>Pessoas que falaram com você</small><strong>37</strong><p>pelo WhatsApp ou Instagram</p></div></article><article><span><Icon name="campaign"/></span><div><small>Anúncios ativos</small><strong>1</strong><p>de 3 anúncios criados</p></div></article></div>
    <section className="active-campaign"><div className="section-head"><div><h2>Seus anúncios</h2><p>Veja rapidamente o que está acontecendo.</p></div><button>Ver todos <Icon name="arrow" size={16}/></button></div><div className="campaign-cards">{clientCampaigns.map((campaign) => <article key={campaign.name}><div className="campaign-visual"><span>FERNANDES<br/><b>ADVOCACIA</b></span></div><div className="campaign-text"><div><span className={campaign.status === "Em andamento" ? "status-live" : "status-done"}>{campaign.status === "Em andamento" && <i/>}{campaign.status}</span><small>{campaign.goal}</small></div><h3>{campaign.name}</h3><div className="result-line"><span><small>Pessoas alcançadas</small><strong>{campaign.metric}</strong></span><span><small>Período</small><strong>{campaign.days}</strong></span></div><div className="budget-progress"><span><i style={{width: `${campaign.progress}%`}}/></span><small>{campaign.progress}% concluído</small></div><button>Ver detalhes <Icon name="chevron" size={15}/></button></div></article>)}</div></section>
    <section className="reassurance"><span><Icon name="spark" size={26}/></span><div><h3>Você não precisa acompanhar tudo sozinho</h3><p>A AnuncIA ajusta e acompanha a campanha automaticamente. Se algo precisar da sua atenção, nós avisaremos.</p></div><button>Como funciona?</button></section>
  </section></DashboardShell>;
}

function AdminDashboard({ onNavigate }: { onNavigate: (view: View) => void }) {
  return <DashboardShell admin onNavigate={onNavigate}><header className="dash-header admin-head"><div><span>PAINEL ADMINISTRATIVO</span><h1>Visão geral da operação</h1><p>Campanhas, clientes e margem em um só lugar.</p></div><div className="date-filter"><Icon name="clock" size={17}/> Últimos 30 dias</div></header><section className="dash-content admin-content">
    <div className="admin-metrics"><article><span className="metric-symbol orange"><Icon name="money"/></span><small>Faturamento</small><strong>R$ 18.450</strong><p><b>↑ 12,8%</b> vs. mês anterior</p></article><article><span className="metric-symbol green"><Icon name="wallet"/></span><small>Margem bruta</small><strong>R$ 9.225</strong><p><b>50%</b> do faturamento</p></article><article><span className="metric-symbol purple"><Icon name="campaign"/></span><small>Campanhas ativas</small><strong>42</strong><p>6 aguardando publicação</p></article><article><span className="metric-symbol blue"><Icon name="users"/></span><small>Clientes ativos</small><strong>31</strong><p><b>+5</b> neste mês</p></article></div>
    <div className="admin-grid"><section className="operation-panel"><div className="section-head"><div><h2>Campanhas que precisam de atenção</h2><p>Prioridades da operação de hoje.</p></div><button>Ver todas <Icon name="arrow" size={16}/></button></div><div className="attention-list">{[
      ["Clínica Novo Sorriso", "Aguardando moderação", "Mensagens · WhatsApp", "Há 8 min", "warning"],
      ["Loja Bella Moda", "Pagamento confirmado", "Mensagens · Instagram", "Há 22 min", "ready"],
      ["Andrade Advocacia", "Erro na publicação", "Mensagens · WhatsApp", "Há 1h", "danger"],
      ["Mercado Bom Preço", "Criativo em geração", "Mensagens · WhatsApp", "Há 2h", "working"]
    ].map(([name, status, goal, time, tone]) => <article key={name}><span className={`client-initial ${tone}`}>{name.charAt(0)}</span><div><b>{name}</b><small>{goal} · {time}</small></div><span className={`admin-status ${tone}`}>{status}</span><button><Icon name="chevron" size={16}/></button></article>)}</div></section>
      <aside className="margin-panel"><div className="section-head"><div><h2>Resumo financeiro</h2><p>Valores dos pacotes vendidos.</p></div></div><div className="donut"><span><b>50%</b><small>margem</small></span></div><div className="legend"><p><i className="media"/> Verba para Meta <b>R$ 9.225</b></p><p><i className="margin"/> Margem da plataforma <b>R$ 9.225</b></p></div><div className="finance-total"><span>Total vendido</span><b>R$ 18.450</b></div></aside>
    </div>
    <section className="clients-table"><div className="section-head"><div><h2>Clientes recentes</h2><p>Últimas movimentações na plataforma.</p></div><button>Ver todos os clientes <Icon name="arrow" size={16}/></button></div><div className="table-head"><span>CLIENTE</span><span>OBJETIVO</span><span>PACOTE</span><span>STATUS</span><span>VALOR</span><span/></div>{[
      ["Clínica Novo Sorriso", "Mensagens", "8 a 13 mil", "Em análise", "R$ 149"],
      ["Loja Bella Moda", "Mensagens", "14 a 20 mil", "Pronta", "R$ 187"],
      ["Andrade Advocacia", "Mensagens", "4 a 7 mil", "Atenção", "R$ 97"]
    ].map((row) => <div className="table-row" key={row[0]}><span><i>{row[0].charAt(0)}</i><b>{row[0]}</b></span><span>{row[1]}</span><span>{row[2]}</span><span><em className={row[3] === "Atenção" ? "danger" : row[3] === "Pronta" ? "ready" : "warning"}>{row[3]}</em></span><span><b>{row[4]}</b></span><button>•••</button></div>)}</section>
  </section></DashboardShell>;
}

function Confirmation({ onDashboard }: { onDashboard: () => void }) {
  return <div className="confirmation"><div className="confirm-icon"><Icon name="check" size={34}/></div><span>TUDO CERTO</span><h1>Seu anúncio está pronto<br/>para começar</h1><p>Assim que o pagamento for confirmado, cuidaremos da publicação e avisaremos você.</p><div className="confirm-steps"><div className="done"><span><Icon name="check" size={14}/></span><b>Anúncio criado</b></div><i/><div><span>2</span><b>Pagamento</b></div><i/><div><span>3</span><b>Publicação</b></div></div><button className="primary" onClick={onDashboard}>Acompanhar meu anúncio <Icon name="arrow" size={18}/></button></div>;
}

export default function Home() {
  const [view, setView] = useState<View>("onboarding");
  const [complete, setComplete] = useState(false);
  const title = useMemo(() => complete ? "Anúncio criado" : view === "onboarding" ? "Criar anúncio" : view === "client" ? "Painel do cliente" : "Painel administrativo", [complete, view]);
  const navigate = (next: View) => { setView(next); setComplete(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <main className="app"><TopBar view={view}/><div className="sr-only" aria-live="polite">{title}</div>{complete ? <Confirmation onDashboard={() => navigate("client")}/> : view === "onboarding" ? <Onboarding onComplete={() => setComplete(true)}/> : view === "client" ? <ClientDashboard onNavigate={navigate}/> : <AdminDashboard onNavigate={navigate}/>}</main>;
}
