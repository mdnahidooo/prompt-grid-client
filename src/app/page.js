import CreatorSection from "@/components/CreatorSection";
import TopCreatorsSection from "@/components/TopCreatorsSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <TopCreatorsSection></TopCreatorsSection>
      <WhyChooseUs></WhyChooseUs>
      <CreatorSection></CreatorSection>
    </div>
  );
}
