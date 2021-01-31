import React from "react";
import { Button, Card, Icon, Label } from "semantic-ui-react";
import cn from "classnames";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";
import styled from "styled-components";

interface ListingCardProps {
  isDisliked: boolean;
  isFav: boolean;
  isLiked: boolean;
  isOwner: boolean;
  onDislike: () => void;
  onFavourite: () => void;
  onLike: () => void;
  likeTotal: number;
  dislikeTotal: number;
  url: string;
}

const CardImg = styled.div`
  background-image: url(${(props: { url: string }) => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0.2rem;
  height: 15rem;
  margin-bottom: 1rem;
`;

const CardFavourite = styled.div`
  position: absolute;
  right: 1rem;
  top: 1.5rem;
`;

export const ListingCard: React.FC<ListingCardProps> = ({
  isDisliked,
  isFav,
  isLiked,
  isOwner,
  onDislike,
  onFavourite,
  onLike,
  likeTotal = 0,
  dislikeTotal = 0,
  url,
}) => {
  if (!url) return null;

  const favClasses: string = cn("heart", {
    outline: !isFav,
  });

  return (
    <Card color={isOwner ? "blue" : null} raised>
      <Card.Content>
        <CardFavourite>
          <Label
            as="button"
            color="pink"
            ribbon="right"
            onClick={onFavourite}
            title={isFav ? "Remove from favourites" : "Add to favourites"}
          >
            <Icon
              name={favClasses as SemanticICONS}
              color="violet"
              size="large"
            />
          </Label>
        </CardFavourite>

        <CardImg url={url} />

        <Button.Group widths="3" compact icon>
          <Button basic={!isLiked} color="green" onClick={onLike}>
            <Icon name="thumbs up" /> {likeTotal}
          </Button>
          <Button basic={!isDisliked} color="red" onClick={onDislike}>
            <Icon name="thumbs down" /> {dislikeTotal}
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
