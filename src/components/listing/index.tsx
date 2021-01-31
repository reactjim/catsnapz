import React from "react";
import { Link } from "react-router-dom";
import { Card, Header, Loader } from "semantic-ui-react";

// components
import { ListingCard } from "~components/listingCard";
import { ErrorMessage } from "~components/errorMessage";
// hooks
import { useCats } from "~hooks/useCats";
import { PATHS } from "~constants";

export const Listing: React.FC = () => {
  const { cats, setFavourite, setLikeDislike, error, loading } = useCats();

  const handleClickLike = (id: string): void => {
    setLikeDislike(id, 1);
  };

  const handleClickDislike = (id: string): void => {
    setLikeDislike(id, 0);
  };

  const handleClickFavourite = (image_id: string): void => {
    setFavourite(image_id);
  };

  const showEmptyText = !error && !loading && !cats.length;

  return (
    <>
      <Loader active={loading} size="big" inline />

      {error && <ErrorMessage message={error} icon />}

      {showEmptyText && (
        <Header size="medium">
          Oh no! The cats have obviously been let out of the bag... why don't
          you <Link to={PATHS.upload}>upload one</Link>?
        </Header>
      )}

      {!!cats.length && (
        <Card.Group doubling itemsPerRow={4} stackable>
          {cats.map((cat) => (
            <ListingCard
              key={cat.id}
              isDisliked={cat.isDisliked}
              isFav={cat.isFav}
              isLiked={cat.isLiked}
              isOwner={cat.isOwner}
              onDislike={() => handleClickDislike(cat.id)}
              onFavourite={() => handleClickFavourite(cat.id)}
              onLike={() => handleClickLike(cat.id)}
              likeTotal={cat.likedTotal}
              dislikeTotal={cat.dislikedTotal}
              url={cat.url}
            />
          ))}
        </Card.Group>
      )}
    </>
  );
};
