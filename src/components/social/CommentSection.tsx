import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';
import {
  HandThumbUpIcon as HandThumbUpSolid,
} from '@heroicons/react/24/solid';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils/cn';
import { useToast } from '../ui/ToastProvider';

interface CommentThread {
  id: string;
  user: { id: string; name: string; username: string; avatar: string };
  text: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
  replies: {
    id: string;
    user: { id: string; name: string; username: string; avatar: string };
    text: string;
    createdAt: string;
    likesCount: number;
    isLiked?: boolean;
  }[];
}

interface CommentThreadProps {
  bookId?: string;
  chapterId?: string;
  initialComments?: CommentThread[];
}

const MOCK_COMMENTS: CommentThread[] = [
  {
    id: 'cmt_1',
    user: { id: 'usr_2', name: 'Marcus Sterling', username: 'marcussterling', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300' },
    text: 'This book completely destroyed me in the best possible way. The way the author weaves the magic system with the political intrigue is just chef\'s kiss 🔥',
    createdAt: '3 hours ago',
    likesCount: 48,
    isLiked: true,
    replies: [
      {
        id: 'rpl_1',
        user: { id: 'usr_3', name: 'Fatima Al-Hassan', username: 'fatimawrites', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=300' },
        text: 'Completely agree! Chapter 7 had me pacing around my room for twenty minutes before I could continue reading 😂',
        createdAt: '2 hours ago',
        likesCount: 12,
        isLiked: false,
      },
    ],
  },
  {
    id: 'cmt_2',
    user: { id: 'usr_4', name: 'Elena Rostova', username: 'elenareads', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300' },
    text: 'Been recommending this to everyone I know. The character development in the second arc is some of the best I\'ve ever read on this platform.',
    createdAt: '5 hours ago',
    likesCount: 32,
    isLiked: false,
    replies: [],
  },
  {
    id: 'cmt_3',
    user: { id: 'usr_5', name: 'Kwame Asante', username: 'kwamereads', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300' },
    text: 'Stayed up until 3am last night. No regrets. The cliffhanger at the end of Chapter 12 is absolutely brutal.',
    createdAt: '1 day ago',
    likesCount: 21,
    isLiked: false,
    replies: [],
  },
];

export const CommentSection: React.FC<CommentThreadProps> = ({
  initialComments = MOCK_COMMENTS,
}) => {
  const toast = useToast();
  const [comments, setComments] = useState<CommentThread[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCmt: CommentThread = {
      id: `cmt_${Date.now()}`,
      user: {
        id: 'usr_current',
        name: 'Alexander Vance',
        username: 'alexvance',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      },
      text: newComment,
      createdAt: 'Just now',
      likesCount: 0,
      isLiked: false,
      replies: [],
    };
    setComments([newCmt, ...comments]);
    setNewComment('');
    toast.success('Comment Posted', 'Your comment was added to the discussion.');
  };

  const handlePostReply = (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReply = {
      id: `rpl_${Date.now()}`,
      user: {
        id: 'usr_current',
        name: 'Alexander Vance',
        username: 'alexvance',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      },
      text: replyText,
      createdAt: 'Just now',
      likesCount: 0,
      isLiked: false,
    };
    setComments(
      comments.map((c) =>
        c.id === parentId ? { ...c, replies: [...c.replies, newReply] } : c
      )
    );
    setReplyText('');
    setReplyingTo(null);
    toast.success('Reply Posted', 'Your reply was added.');
  };

  const toggleLike = (commentId: string) => {
    setComments(
      comments.map((c) =>
        c.id === commentId
          ? { ...c, likesCount: c.isLiked ? c.likesCount - 1 : c.likesCount + 1, isLiked: !c.isLiked }
          : c
      )
    );
  };

  return (
    <section className="space-y-5">
      <h3 className="font-serif font-bold text-slate-900 text-lg border-b border-slate-100 pb-3">
        Discussion ({comments.length} comments)
      </h3>

      {/* New Comment Input */}
      <form onSubmit={handlePostComment} className="flex items-start gap-3">
        <Avatar
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
          name="Alexander Vance"
          size="md"
          className="shrink-0 mt-0.5"
        />
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-brand-900 focus-within:bg-white transition-all">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts on this book..."
            rows={2}
            className="w-full text-sm text-slate-800 bg-transparent resize-none focus:outline-none placeholder:text-slate-400"
          />
          {newComment.trim() && (
            <div className="flex justify-end mt-2">
              <Button type="submit" variant="primary" size="sm">
                Post Comment
              </Button>
            </div>
          )}
        </div>
      </form>

      {/* Comment Threads */}
      <div className="space-y-5">
        {comments.map((cmt) => (
          <div key={cmt.id} className="flex items-start gap-3">
            <Avatar src={cmt.user.avatar} name={cmt.user.name} size="md" className="shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              {/* Comment Bubble */}
              <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                <div className="flex items-center gap-1.5 mb-1">
                  <Link to={`/authors/${cmt.user.id}`} className="font-bold text-sm text-slate-900 hover:text-brand-900">
                    {cmt.user.name}
                  </Link>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-400">{cmt.createdAt}</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{cmt.text}</p>
              </div>

              {/* Comment Actions */}
              <div className="flex items-center gap-3 mt-1.5 pl-1">
                <button
                  onClick={() => toggleLike(cmt.id)}
                  className={cn(
                    'inline-flex items-center gap-1 text-xs font-semibold transition-colors',
                    cmt.isLiked ? 'text-brand-900' : 'text-slate-500 hover:text-brand-900'
                  )}
                >
                  {cmt.isLiked ? (
                    <HandThumbUpSolid className="w-3.5 h-3.5" />
                  ) : (
                    <HandThumbUpIcon className="w-3.5 h-3.5" />
                  )}
                  {cmt.likesCount > 0 && <span>{cmt.likesCount}</span>}
                </button>

                <button
                  onClick={() => setReplyingTo(replyingTo === cmt.id ? null : cmt.id)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-brand-900 transition-colors"
                >
                  <ChatBubbleLeftIcon className="w-3.5 h-3.5" />
                  Reply
                  {cmt.replies.length > 0 && (
                    <span className="text-slate-400">({cmt.replies.length})</span>
                  )}
                </button>

                <button className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-rose-500 transition-colors ml-auto">
                  <FlagIcon className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Replies */}
              {cmt.replies.length > 0 && (
                <div className="mt-3 space-y-3 pl-4 border-l-2 border-slate-100">
                  {cmt.replies.map((reply) => (
                    <div key={reply.id} className="flex items-start gap-2.5">
                      <Avatar src={reply.user.avatar} name={reply.user.name} size="sm" className="shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="font-bold text-xs text-slate-900">{reply.user.name}</span>
                            <span className="text-slate-300 text-xs">·</span>
                            <span className="text-[11px] text-slate-400">{reply.createdAt}</span>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed">{reply.text}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1 pl-1">
                          <button className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-brand-900 transition-colors">
                            <HandThumbUpIcon className="w-3 h-3" />
                            {reply.likesCount > 0 && reply.likesCount}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Input Box */}
              {replyingTo === cmt.id && (
                <form
                  onSubmit={(e) => handlePostReply(e, cmt.id)}
                  className="mt-3 flex items-start gap-2.5 pl-4"
                >
                  <Avatar
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
                    name="Alexander Vance"
                    size="sm"
                    className="shrink-0 mt-0.5"
                  />
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-brand-900 transition-all">
                    <input
                      type="text"
                      autoFocus
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Reply to ${cmt.user.name}...`}
                      className="w-full text-xs text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400"
                    />
                    {replyText.trim() && (
                      <div className="flex justify-end mt-1.5">
                        <Button type="submit" variant="primary" size="sm">
                          Reply
                        </Button>
                      </div>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
