import { TagEnum } from '@/types';

interface TagI {
  tag: TagEnum;
  handleTagInsert: (val: TagEnum) => void;
}

export const Tag = ({ tag, handleTagInsert }: TagI) => {
  return (
    <button
      onClick={() => handleTagInsert(tag)}
      className='py-1 px-2 bg-violet-100 text-violet-800 rounded-md hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500'
    >
      {tag}
    </button>
  );
};
