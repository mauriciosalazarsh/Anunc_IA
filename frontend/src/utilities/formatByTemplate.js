const formatDefineCampaign = (data) => {
    if (!data.detalles_campana) return "<p>Datos no disponibles.</p>";
    const { objetivo_campana, presupuesto_total, duracion_optima } = data.detalles_campana;

    return `
<h2>Objetivo de la Campaña</h2>
<ul>
    <li><strong>Objetivo:</strong> ${objetivo_campana?.objetivo || "N/A"}</li>
    <li><strong>Explicación:</strong> ${objetivo_campana?.explicacion || "N/A"}</li>
</ul>
<h2>Presupuesto Total</h2>
<ul>
    <li><strong>Cantidad:</strong> ${presupuesto_total?.cantidad || "N/A"}</li>
    <li><strong>Explicación:</strong> ${presupuesto_total?.explicacion || "N/A"}</li>
</ul>
<h2>Duración Óptima</h2>
<ul>
    <li><strong>Duración:</strong> ${duracion_optima?.duracion || "N/A"}</li>
    <li><strong>Explicación:</strong> ${duracion_optima?.explicacion || "N/A"}</li>
</ul>`;
};

const formatDefineAudience = (data) => {
    if (!data.publico_objetivo) return "<p>Datos no disponibles.</p>";
    const { demografico, psicografico } = data.publico_objetivo;

    return `
<h2>Público Objetivo</h2>
<h3>Demográfico</h3>
<ul>
    <li><strong>Edad:</strong> ${demografico?.edad || "N/A"}</li>
    <li><strong>Género:</strong> ${demografico?.genero || "N/A"}</li>
    <li><strong>Ubicaciones:</strong> ${
        demografico?.ubicaciones?.map(
            (loc) => `${loc.distrito}, ${loc.provincia}, ${loc.departamento}`
        ).join(", ") || "N/A"
    }</li>
    <li><strong>Otros:</strong> ${demografico?.otros || "N/A"}</li>
</ul>
<h3>Psicográfico</h3>
<ul>
    <li><strong>Intereses:</strong> ${psicografico?.intereses || "N/A"}</li>
    <li><strong>Comportamientos:</strong> ${psicografico?.comportamientos || "N/A"}</li>
</ul>`;
};

const formatChooseFormatCTA = (data) => {
    if (!data.formato_anuncio) return "<p>Datos no disponibles.</p>";
    const { formato_anuncio, cta } = data;

    return `
<h2>Formato del Anuncio</h2>
<ul>
    <li><strong>Formato:</strong> ${formato_anuncio?.formato || "N/A"}</li>
    <li><strong>Explicación:</strong> ${formato_anuncio?.explicacion || "N/A"}</li>
</ul>
<h2>Llamada a la Acción (CTA)</h2>
<ul>
    <li><strong>CTA:</strong> ${cta?.llamada_a_la_accion || "N/A"}</li>
    <li><strong>Explicación:</strong> ${cta?.explicacion || "N/A"}</li>
</ul>`;
};

const formatCreateCreativeContent = (data) => {
    if (!data.variaciones) return "<p>No hay contenido disponible.</p>";

    return `
<h2>Variaciones del Contenido</h2>
<ul>
    ${data.variaciones.map(
        (item, index) => `
        <li>
            <strong>Variación ${index + 1}</strong>
            <p><strong>Título:</strong> ${item.titulo}</p>
            <p><strong>Contenido:</strong> ${item.contenido}</p>
        </li>`
    ).join("")}
</ul>`;
};

const formatCreateHeading = (data) => {
    if (!data.encabezados) return "<p>No hay encabezados disponibles.</p>";

    return `
<h2>Encabezados Generados</h2>
<ul>
    ${data.encabezados.map((header) => `<li>${header}</li>`).join("")}
</ul>`;
};

// Selector de formato según plantilla
export const formatByTemplate = (slug, data) => {
    switch (slug) {
        case "define-campaign":
            return formatDefineCampaign(data);
        case "define-audience":
            return formatDefineAudience(data);
        case "choose-format-cta":
            return formatChooseFormatCTA(data);
        case "create-creative-content":
            return formatCreateCreativeContent(data);
        case "create-heading":
            return formatCreateHeading(data);
        default:
            return "<p>Formato no definido para esta plantilla.</p>";
    }
};
