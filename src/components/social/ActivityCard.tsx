import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChatBubbleLeftEllipsisIcon, ShareIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { Activity } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Card } from '../ui/Card';
import { ReactionButton } from './ReactionButton';
import { BookCover } from '../books/BookCover';
import { useToggleLikeActivity } from '../../hooks/useFeed';
import { formatNumber } from '../../lib/utils/cn';

export interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const [showComments, setShowComments] = useState(false);
  const toggleLikeMutation = useToggleLikeActivity();

  const handleLike = () => {
    toggleLikeMutation.mutate(activity.id);
  };

  const getActionLabel = () => {
    switch (activity.type) {
      case 'publish_chapter':
        return `published a new chapter`;
      case 'publish_book':
        return `published a new book`;
      case 'start_reading':
        return `started reading`;
      case 'finish_book':
        return `finished reading`;
      case 'comment':
        return `commented on`;
      default:
        return `shared an update`;
    }
  };

  return (
    <Card className="mb-4">
      {/* Activity Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar src={activity.user.avatar} name={activity.user.name} size="md" />
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link to={`/authors/${activity.user.id}`} className="font-semibold text-slate-900 text-sm hover:text-brand-900">
                {activity.user.name}
              </Link>
              <span className="text-xs text-slate-500">{getActionLabel()}</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-0.5">{activity.timestamp}</span>
          </div>
        </div>
      </div>

      {/* Comment text if present */}
      {activity.commentText && (
        <p className="text-sm text-slate-800 bg-slate-50 border border-slate-100 p-3 rounded-md mb-3 leading-relaxed">
          "{activity.commentText}"
        </p>
      )}

      {/* Book / Chapter Embedded Preview */}
      {activity.book && (
        <div className="flex gap-4 p-3.5 bg-slate-50/70 border border-slate-200/70 rounded-lg mb-3">
          <Link to={`/books/${activity.book.id}`}>
            <BookCover src={activity.book.coverImage} alt={activity.book.title} size="sm" />
          </Link>

          <div className="flex-1 flex flex-col justify-center min-w-0">
            {activity.chapter && (
              <span className="text-[11px] font-semibold tracking-wider text-brand-900 uppercase mb-0.5">
                Chapter {activity.chapter.chapterNumber}
              </span>
            )}
            <Link to={`/books/${activity.book.id}`} className="hover:text-brand-900">
              <h4 className="font-serif font-bold text-slate-900 text-sm truncate">
                {activity.chapter ? activity.chapter.title : activity.book.title}
              </h4>
            </Link>
            <p className="text-xs text-slate-500 truncate">by {activity.book.author.name}</p>

            <Link
              to={`/read/${activity.book.id}/${activity.chapter?.id || 'chap_1_1'}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-900 hover:underline mt-2"
            >
              <BookOpenIcon className="w-3.5 h-3.5" />
              <span>Read Chapter</span>
            </Link>
          </div>
        </div>
      )}

      {/* Activity Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <ReactionButton
            initialLiked={activity.userLiked}
            initialCount={activity.likesCount}
            onToggle={handleLike}
            size="sm"
          />

          <button
            onClick={() => setShowComments(!showComments)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors font-medium"
          >
            <ChatBubbleLeftEllipsisIcon className="w-3.5 h-3.5" />
            <span>{formatNumber(activity.commentsCount)} Comments</span>
          </button>
        </div>

        <button className="inline-flex items-center gap-1 px-2.5 py-1 text-slate-500 hover:text-slate-800 transition-colors">
          <ShareIcon className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Expandable Comments Drawer */}
      {showComments && (
        <div className="mt-3 pt-3 border-t border-slate-100 animate-in fade-in">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-brand-900"
            />
            <button className="px-3 py-1.5 bg-brand-900 text-white text-xs font-medium rounded-md hover:bg-brand-800">
              Post
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};
