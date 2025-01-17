import React from 'react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
}

export function CourseCard({
  title,
  description,
  image,
  slug,
}: CourseCardProps) {
  return (
    <Link
      to={`/courses/${slug}`}
      className="flex items-start bg-white shadow-md rounded-lg overflow-hidden w-[90%] max-h-[100px]"
    >
      <img
        src={image}
        alt="Course Thumbnail"
        className="min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px] object-cover"
      />
      <div className="p-2 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
