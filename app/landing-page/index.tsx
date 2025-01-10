import MyWidget from "@/components/demo-widget";
import FeaturesSection from "./features-section";
import Hero from "./hero";
import PricingSection from "./pricing-section";

const LandingPage = () => {
    return (
        <div>
            <Hero />
            <FeaturesSection />
            <PricingSection />
            <MyWidget />
        </div>
    )
}

export default LandingPage;