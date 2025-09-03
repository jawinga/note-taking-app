import React from "react";
import { TagItem } from "./Tag";
import Tag from "./Tag";

type Props = {
  tags: TagItem[];
  className: string;
  gapClassName?: string;
  onRemove?: (index: number) => void;
};

const TagList = ({
  tags,
  className = "flex flex-row flex-wrap",
  gapClassName,
  onRemove,
}: Props) => {
  const keyFor = (t: TagItem, i: number) => `${t.tag}-${t.colour}-${i}`;

  return (
    <ul className={`${className} ${gapClassName}`} role="list">
      {tags.map((t, i) => (
        <li key={keyFor(t, i)}>
          <Tag item={t} onRemove={onRemove ? () => onRemove(i) : undefined} />
        </li>
      ))}
    </ul>
  );
};

export default TagList;
