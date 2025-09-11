import React from "react";
import { TagItem } from "./Tag";
import Tag from "./Tag";

type Props = {
  tags: TagItem[];
  className: string;
  gapClassName?: string;
  onRemove?: (id: string) => void;
};

const TagList = ({
  tags,
  className = "flex flex-row flex-wrap",
  gapClassName,
  onRemove,
}: Props) => {
  return (
    <ul className={`${className} ${gapClassName}`} role="list">
      {tags.map((t) => (
        <li key={t.id}>
          <Tag
            key={t.id}
            item={t}
            onRemove={onRemove ? () => onRemove(t.id) : undefined}
          />
        </li>
      ))}
    </ul>
  );
};

export default TagList;
