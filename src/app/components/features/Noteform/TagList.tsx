import React from "react";
import { TagItem } from "./Tag";
import Tag from "./Tag";

type Props = {
  tags: TagItem[];
  className: string;
  gapClassName?: string;
  onRemove?: (id: string) => void;
  tagClassName?: string;
  countsByTagId?: Record<string, number>;
  showCounts?: boolean;
};

const TagList = ({
  tags,
  className = "flex flex-row flex-wrap",
  gapClassName,
  onRemove,
  tagClassName,
  countsByTagId,
  showCounts,
}: Props) => {
  return (
    <ul className={`${className} ${gapClassName}`} role="list">
      {tags.map((t) => (
        <li key={t.id}>
          <Tag
            key={t.id}
            item={t}
            onRemove={onRemove ? () => onRemove(t.id) : undefined}
            className={tagClassName}
            count={showCounts ? countsByTagId?.[t.id] ?? 0 : undefined}
          />
        </li>
      ))}
    </ul>
  );
};

export default TagList;
