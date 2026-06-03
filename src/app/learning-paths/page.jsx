import { learningPaths } from '@/data/learningPathsData';
import LearningPathCard from '@/components/LearningPathCard';
import SectionHeader from '@/components/SectionHeader';

export const metadata = {
  title: 'Learning Paths | FreeCertify Hub',
  description:
    'Follow structured career paths to build skills step by step with free certification courses.',
};

export default function LearningPathsPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <SectionHeader
        title="Learning Paths"
        subtitle="Follow structured career paths to build skills step by step with free certification courses."
        className="mb-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPaths.map((path) => (
          <LearningPathCard key={path.id} path={path} />
        ))}
      </div>
    </section>
  );
}
