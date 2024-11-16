import {
    Dashboard,
    Robot,
    Tag,
    Grid,
    Notes,
    Internet,
    Settings,
} from "../../../components/icons";

const menuData = [
    {
        icon: <Dashboard />,
        text: "Dashboard",
        link: "/dashboard",
    },
    {
        icon: <Robot />, // Nuevo icono de robot
        text: "Asistente de IA",
        link: "/#",
        sub: [
            {
                text: "Headline para Anuncio",
                link: "/#",
            },
            {
                text: "Descripción para Anuncio",
                link: "/#",
            },
            {
                text: "Identificador de Público",
                link: "/#",
            },
            {
                text: "Recomendación de Presupuesto y Duración",
                link: "/#",
            },
            {
                text: "Prompt para Imagen AI",
                link: "/#",
            },
        ],
    },
    {
        icon: <Tag />,
        text: "Publica Anuncios",
        link: "/#",
        sub: [
            {
                text: "Facebook",
                link: "/#",
            },
            {
                text: "Google",
                link: "/#",
            },
            {
                text: "TikTok",
                link: "/#",
            },
        ],
    },
    {
        icon: <Notes />,
        text: "Documentos Creados",
        link: "/documents",
    },
    {
        icon: <Internet />,
        text: "Vincular Cuenta Publicitaria",
        link: "/#",
    },
    {
        icon: <Settings />,
        text: "Configuraciones",
        link: "/#",
    },
];

export default menuData;
