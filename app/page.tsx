import LandingPage from "./landing-page";
import Footer from "./landing-page/footer";

export default function Home() {
  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between pt-4">
    <LandingPage />
    <Footer />
    </main>
    </>
  );
}
