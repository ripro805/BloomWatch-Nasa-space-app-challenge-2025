import { Navigation } from "@/components/ui/navigation";
import { HomePage } from "@/components/HomePage";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-space">
      <Navigation />
      <main className="container mx-auto">
        <HomePage />
      </main>
    </div>
  );
};

export default Index;
