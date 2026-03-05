import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Particles from "@/components/Particles";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import CatCharacter from "@/components/CatCharacter";
import SurpriseMoments from "@/components/SurpriseMoments";
import SmoothScroll from "@/components/SmoothScroll";
import Index from "./pages/Index";
import Books from "./pages/Books";
import Universe from "./pages/Universe";
import About from "./pages/About";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SmoothScroll />
        <CustomCursor />
        <CatCharacter />
        <SurpriseMoments />
        <Particles />
        <Navigation />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/books" element={<Books />} />
            <Route path="/universe" element={<Universe />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </main>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
