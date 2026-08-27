import React, { useState } from 'react';
import { UserPlusIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { useToast } from '../ui/ToastProvider';

export interface FollowButtonProps {
  authorId: string;
  authorName: string;
  initialFollowing?: boolean;
  size?: 'sm' | 'md';
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  authorName,
  initialFollowing = false,
  size = 'md',
}) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowing);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleToggleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsFollowing(!isFollowing);
      setIsLoading(false);
      if (!isFollowing) {
        toast.success('Following Author', `You are now following ${authorName}.`);
      } else {
        toast.info('Unfollowed', `You unfollowed ${authorName}.`);
      }
    }, 250);
  };

  return (
    <Button
      variant={isFollowing ? 'outline' : 'primary'}
      size={size}
      isLoading={isLoading}
      onClick={handleToggleFollow}
      leftIcon={isFollowing ? <CheckCircleIcon className="w-4 h-4 text-emerald-600" /> : <UserPlusIcon className="w-4 h-4" />}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  );
};
