import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import React, { CSSProperties, MouseEvent, forwardRef } from "react"
import { User } from "../../types/User"

interface Props {
  isSkeleton?: boolean
  user?: User
  style?: CSSProperties
  onClick?: (event: MouseEvent<HTMLElement>, user?: User) => unknown
  expanded?: boolean
}

const useStyles = makeStyles((theme) => ({
  wrapper: {},
  root: {
    display: "flex",
    maxWidth: 1000,
    margin: "0 auto",
    flexWrap: "wrap",
    height: "100%",
    background: theme.palette.grey[100],
  },
  background: {
    background: theme.palette.background.paper,
    flexGrow: 1,
    alignSelf: "flex-start",
    minHeight: 200,
  },
  media: {
    width: 200,
    height: 200,
    objectFit: "cover",
    background: theme.palette.background.default,
  },
  code: {},
}))

export const CardUser = forwardRef(function (
  { isSkeleton, user, style, expanded, onClick }: Props,
  ref,
) {
  const classes = useStyles()

  return (
    <Box
      {...({ ref } as any)}
      my={3}
      style={style}
      onClick={onClick ? (e) => onClick(e, user) : undefined}
      className={classes.wrapper}
    >
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
        <CardContent className={classes.background}>
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
        {expanded ? (
          <Box width="100%" alignSelf="stretch" className={classes.code}>
            <CardContent>
              <pre>
                <Typography component="code">
                  {isSkeleton ? (
                    <>
                      <Skeleton animation="wave" variant="text" width={50} />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={Math.max(150, Math.random() * 200)}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={Math.max(150, Math.random() * 300)}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={Math.max(150, Math.random() * 300)}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={Math.max(150, Math.random() * 300)}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={Math.max(150, Math.random() * 700)}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={Math.max(150, Math.random() * 700)}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={Math.max(150, Math.random() * 300)}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={Math.max(150, Math.random() * 300)}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={Math.max(150, Math.random() * 700)}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={Math.max(150, Math.random() * 700)}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={Math.max(150, Math.random() * 300)}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={Math.max(150, Math.random() * 300)}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={Math.max(150, Math.random() * 300)}
                      />
                      <Skeleton
                        animation="wave"
                        variant="text"
                        width={Math.max(150, Math.random() * 200)}
                      />
                      <Skeleton animation="wave" variant="text" width={50} />
                    </>
                  ) : (
                    JSON.stringify(user, null, "    ")
                  )}
                </Typography>
              </pre>
            </CardContent>
          </Box>
        ) : null}
      </Card>
    </Box>
  )
})
