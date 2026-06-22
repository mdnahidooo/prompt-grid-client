import CreatorSection from "@/components/CreatorSection";
import FeaturedPromptsSection from "@/components/FeaturedPromptsSection";
import PromptHeroBanner from "@/components/PromptHeroBanner";
import ReviewSection from "@/components/ReviewSection";
import TopCreatorsSection from "@/components/TopCreatorsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <PromptHeroBanner></PromptHeroBanner>
      <FeaturedPromptsSection />
      <TopCreatorsSection></TopCreatorsSection>
      <WhyChooseUs></WhyChooseUs>
      <CreatorSection></CreatorSection>
      <ReviewSection></ReviewSection>
    </div>
  );
}
