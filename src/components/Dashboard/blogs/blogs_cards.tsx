import React, { ReactNode } from 'react';

interface BlogsCardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  image: string; // Add an image prop
  children: ReactNode;
}

const BlogsCards: React.FC<BlogsCardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  image,
  children,
}) => {
  return (
    <div
      className="relative rounded-sm border border-stroke bg-white py-8 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        position: 'relative',
      }}
    >
      <div
        className="absolute inset-0 bg-black opacity-5 rounded-none"
        style={{ zIndex: 1 }}
      ></div>

      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4 inset-y-0 right-0">
        {children}
      </div>

      <div className="mt-6 flex items-end justify-between relative z-10">
        <div>
          <h4 className="text-title-md font-bold text-graydark">{total}</h4>
          <span className="text-base font-medium text-graydark">{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-base font-medium ${
            levelUp && 'text-meta-4'
          } ${levelDown && 'text-meta-5'}`}
        >
          {rate}
        </span>
      </div>
    </div>
  );
};

export default BlogsCards;
