import { Card, Typography, makeStyles } from "@material-ui/core"
import React from "react"
import { FadeAfterScroll } from "../FadeAfterScroll"

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.default,
    maxWidth: 1000,
    margin: "0 auto",
  },
  card: {
    height: 200,
    padding: theme.spacing(2),
    margin: theme.spacing(4),
  },
}))

export default function RouteAnimateAfterScroll() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        ullamcorper magna in eros commodo ultrices. Donec quis nibh ac enim
        congue volutpat. In dictum egestas congue. Phasellus aliquet dui sit
        amet risus bibendum, et dictum sem dapibus. Quisque sagittis urna mattis
        ex suscipit, sed tempus tortor interdum. Nam et turpis aliquet, ornare
        libero eget, tincidunt lectus. Sed auctor consectetur enim, non rutrum
        ante finibus a. Proin pulvinar metus quis risus tempus gravida. Duis leo
        nisl, varius sagittis interdum sit amet, euismod et augue. Donec egestas
        ligula ipsum, vel consectetur ante volutpat et. Nulla sed sapien
        sagittis, facilisis nisi ac, dictum turpis. Duis elit sapien, dignissim
        vel venenatis at, euismod sit amet magna. Pellentesque imperdiet
        venenatis nibh id convallis. Sed pretium lacus massa, sit amet maximus
        lacus interdum in. Vivamus volutpat fringilla pulvinar. Cras congue et
        odio ac dignissim. Orci varius natoque penatibus et magnis dis
        parturient montes, nascetur ridiculus mus. Donec blandit lorem ut
        tincidunt consequat. Vivamus sapien enim, ullamcorper sit amet laoreet
        a, viverra vitae ante. Curabitur non massa vel justo hendrerit ultrices
        vitae quis ante. Ut cursus risus in luctus mattis. In sed condimentum
        purus. Proin nunc risus, egestas eu venenatis non, dignissim a ante. Ut
        ultrices sapien neque, vitae facilisis ipsum dapibus nec. Nullam aliquet
        arcu at luctus viverra.
      </Typography>
      <FadeAfterScroll
        height={200}
        timeout={800}
        startVisible={true}
        animateExit={true}
      >
        <Card className={classes.card}>1</Card>
      </FadeAfterScroll>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        ullamcorper magna in eros commodo ultrices. Donec quis nibh ac enim
        congue volutpat. In dictum egestas congue. Phasellus aliquet dui sit
        amet risus bibendum, et dictum sem dapibus. Quisque sagittis urna mattis
        ex suscipit, sed tempus tortor interdum. Nam et turpis aliquet, ornare
        libero eget, tincidunt lectus. Sed auctor consectetur enim, non rutrum
        ante finibus a. Proin pulvinar metus quis risus tempus gravida. Duis leo
        nisl, varius sagittis interdum sit amet, euismod et augue. Donec egestas
        ligula ipsum, vel consectetur ante volutpat et. Nulla sed sapien
        sagittis, facilisis nisi ac, dictum turpis. Duis elit sapien, dignissim
        vel venenatis at, euismod sit amet magna. Pellentesque imperdiet
        venenatis nibh id convallis. Sed pretium lacus massa, sit amet maximus
        lacus interdum in. Vivamus volutpat fringilla pulvinar. Cras congue et
        odio ac dignissim. Orci varius natoque penatibus et magnis dis
        parturient montes, nascetur ridiculus mus. Donec blandit lorem ut
        tincidunt consequat. Vivamus sapien enim, ullamcorper sit amet laoreet
        a, viverra vitae ante. Curabitur non massa vel justo hendrerit ultrices
        vitae quis ante. Ut cursus risus in luctus mattis. In sed condimentum
        purus. Proin nunc risus, egestas eu venenatis non, dignissim a ante. Ut
        ultrices sapien neque, vitae facilisis ipsum dapibus nec. Nullam aliquet
        arcu at luctus viverra.
      </Typography>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        ullamcorper magna in eros commodo ultrices. Donec quis nibh ac enim
        congue volutpat. In dictum egestas congue. Phasellus aliquet dui sit
        amet risus bibendum, et dictum sem dapibus. Quisque sagittis urna mattis
        ex suscipit, sed tempus tortor interdum. Nam et turpis aliquet, ornare
        libero eget, tincidunt lectus. Sed auctor consectetur enim, non rutrum
        ante finibus a. Proin pulvinar metus quis risus tempus gravida. Duis leo
        nisl, varius sagittis interdum sit amet, euismod et augue. Donec egestas
        ligula ipsum, vel consectetur ante volutpat et. Nulla sed sapien
        sagittis, facilisis nisi ac, dictum turpis. Duis elit sapien, dignissim
        vel venenatis at, euismod sit amet magna. Pellentesque imperdiet
        venenatis nibh id convallis. Sed pretium lacus massa, sit amet maximus
        lacus interdum in. Vivamus volutpat fringilla pulvinar. Cras congue et
        odio ac dignissim. Orci varius natoque penatibus et magnis dis
        parturient montes, nascetur ridiculus mus. Donec blandit lorem ut
        tincidunt consequat. Vivamus sapien enim, ullamcorper sit amet laoreet
        a, viverra vitae ante. Curabitur non massa vel justo hendrerit ultrices
        vitae quis ante. Ut cursus risus in luctus mattis. In sed condimentum
        purus. Proin nunc risus, egestas eu venenatis non, dignissim a ante. Ut
        ultrices sapien neque, vitae facilisis ipsum dapibus nec. Nullam aliquet
        arcu at luctus viverra.
      </Typography>
      <FadeAfterScroll height={200} timeout={800} animateExit={true}>
        <Card className={classes.card}>2</Card>
      </FadeAfterScroll>
      <FadeAfterScroll height={200} timeout={800} animateExit={true}>
        <Card className={classes.card}>3</Card>
      </FadeAfterScroll>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        ullamcorper magna in eros commodo ultrices. Donec quis nibh ac enim
        congue volutpat. In dictum egestas congue. Phasellus aliquet dui sit
        amet risus bibendum, et dictum sem dapibus. Quisque sagittis urna mattis
        ex suscipit, sed tempus tortor interdum. Nam et turpis aliquet, ornare
        libero eget, tincidunt lectus. Sed auctor consectetur enim, non rutrum
        ante finibus a. Proin pulvinar metus quis risus tempus gravida. Duis leo
        nisl, varius sagittis interdum sit amet, euismod et augue. Donec egestas
        ligula ipsum, vel consectetur ante volutpat et. Nulla sed sapien
        sagittis, facilisis nisi ac, dictum turpis. Duis elit sapien, dignissim
        vel venenatis at, euismod sit amet magna. Pellentesque imperdiet
        venenatis nibh id convallis. Sed pretium lacus massa, sit amet maximus
        lacus interdum in. Vivamus volutpat fringilla pulvinar. Cras congue et
        odio ac dignissim. Orci varius natoque penatibus et magnis dis
        parturient montes, nascetur ridiculus mus. Donec blandit lorem ut
        tincidunt consequat. Vivamus sapien enim, ullamcorper sit amet laoreet
        a, viverra vitae ante. Curabitur non massa vel justo hendrerit ultrices
        vitae quis ante. Ut cursus risus in luctus mattis. In sed condimentum
        purus. Proin nunc risus, egestas eu venenatis non, dignissim a ante. Ut
        ultrices sapien neque, vitae facilisis ipsum dapibus nec. Nullam aliquet
        arcu at luctus viverra.
      </Typography>
    </div>
  )
}
