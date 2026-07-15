import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ActivityPopups from "@/components/ActivityPopups";
import Index from "./pages/Index.tsx";
import HairTypesPage from "./pages/HairTypesPage.tsx";
import HairTypeDetailPage from "./pages/HairTypeDetailPage.tsx";
import ExpertsPage from "./pages/ExpertsPage.tsx";
import ExpertDetailPage from "./pages/ExpertDetailPage.tsx";
import TipsPage from "./pages/TipsPage.tsx";
import QuizPage from "./pages/QuizPage.tsx";
import CrownMatchGame from "./pages/CrownMatchGame.tsx";
import RoutineBuilderPage from "./pages/RoutineBuilderPage.tsx";
import VideosPage from "./pages/VideosPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import BlogPostPage from "./pages/BlogPostPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import GalleryPage from "./pages/GalleryPage.tsx";
import TestimonialsPage from "./pages/TestimonialsPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import AdminLoginPage from "./pages/AdminLoginPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/hair-types" element={<HairTypesPage />} />
          <Route path="/hair-types/:slug" element={<HairTypeDetailPage />} />
          <Route path="/experts" element={<ExpertsPage />} />
          <Route path="/experts/:id" element={<ExpertDetailPage />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/game" element={<CrownMatchGame />} />
          <Route path="/routine" element={<RoutineBuilderPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ActivityPopups />
      </BrowserRouter>
      <Analytics />
      <SpeedInsights />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
