import React from "react";
import { getAllProjects, getProfile } from "@/lib/content/loader";
import HomeView from "@/components/portfolio/HomeView";

export default function HomePage() {
  const profile = getProfile();
  const projects = getAllProjects();

  return <HomeView profile={profile} projects={projects} />;
}
