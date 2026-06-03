import { platformsInfo } from '@/data/platformsData';
import { courses } from '@/data/coursesData';
import PlatformCard from '@/components/PlatformCard';
import SectionHeader from '@/components/SectionHeader';

export const metadata = {
  title: 'Learning Platforms | FreeCertify Hub',
  description:
    'Explore trusted platforms offering free certification courses.',
};

export default function PlatformsPage() {
  // Build a map of platform name → course count from actual course data
  const platformCounts = {};
  for (const course of courses) {
    const name = course.platform;
    platformCounts[name] = (platformCounts[name] || 0) + 1;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <SectionHeader
        title="Learning Platforms"
        subtitle="Explore trusted platforms offering free certification courses."
        className="mb-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platformsInfo.map((platform) => {
          // Match platform name loosely — the data names may not match exactly
          const courseCount =
            platformCounts[platform.name] ||
            Object.entries(platformCounts).find(([key]) =>
              key.toLowerCase().includes(platform.name.toLowerCase()) ||
              platform.name.toLowerCase().includes(key.toLowerCase())
            )?.[1] ||
            0;

          return (
            <PlatformCard
              key={platform.id}
              platform={{
                name: platform.name,
                description: platform.description,
                categories: platform.categories,
                certificate: platform.certificateAvailability,
                url: platform.platformUrl,
                color: platform.color,
              }}
              courseCount={courseCount}
            />
          );
        })}
      </div>
    </section>
  );
}
