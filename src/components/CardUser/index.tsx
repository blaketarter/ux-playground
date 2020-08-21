import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import React, { CSSProperties } from "react"
import { User } from "../../types/User"

interface Props {
  isSkeleton?: boolean
  user?: User
  style?: CSSProperties
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: 1000,
    margin: "0 auto",
  },
  media: {
    width: 200,
    height: 200,
    objectFit: "cover",
    background: theme.palette.background.default,
  },
}))

export function CardUser({ isSkeleton, user, style }: Props) {
  const classes = useStyles()

  return (
    <Box my={3} style={style}>
      <Card elevation={2} className={classes.root}>
        {isSkeleton ? (
          <Skeleton animation="wave" variant="rect" className={classes.media} />
        ) : (
          <CardMedia
            component="img"
            className={classes.media}
            src={`https://picsum.photos/200?q=${user?.id}`}
            alt={`${user?.name} profile picture`}
            loading="lazy"
          />
        )}
        <CardContent>
          <Typography variant="h4">
            {isSkeleton ? (
              <Skeleton
                animation="wave"
                variant="text"
                width={Math.max(200, Math.random() * 600)}
              />
            ) : (
              user?.name
            )}
          </Typography>
          <Typography>
            {isSkeleton ? (
              <Skeleton
                animation="wave"
                variant="text"
                width={Math.max(150, Math.random() * 300)}
              />
            ) : (
              user?.email
            )}
          </Typography>
          <Typography>
            {isSkeleton ? (
              <Skeleton
                animation="wave"
                variant="text"
                width={Math.max(150, Math.random() * 300)}
              />
            ) : (
              user?.phone
            )}
          </Typography>
          <Typography>
            {isSkeleton ? (
              <Skeleton
                animation="wave"
                variant="text"
                width={Math.max(150, Math.random() * 300)}
              />
            ) : (
              user?.website
            )}
          </Typography>
          <Typography>
            {isSkeleton ? (
              <Skeleton
                animation="wave"
                variant="text"
                width={Math.max(150, Math.random() * 300)}
              />
            ) : (
              user?.email
            )}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
