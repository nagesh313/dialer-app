import NoteAddIcon from "@material-ui/icons/NoteAdd";
import React from "react";
import CreateCampaignStepper from "./components/CreateCampaignStepper";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import CampaignList from "./components/CampaignList";
const dashboardRoutes = [
  {
    path: "/CreateCampaignStepper",
    name: "Create Campaign",
    icon: <NoteAddIcon></NoteAddIcon>,
    component: <CreateCampaignStepper></CreateCampaignStepper>,
    layout: "/CreateCampaignStepper",
  },
  {
    path: "/CampaignList",
    name: "Campaign List",
    icon: <FormatListBulletedIcon></FormatListBulletedIcon>,
    component: <CampaignList></CampaignList>,
    layout: "/CampaignList",
  },
];

export default dashboardRoutes;
