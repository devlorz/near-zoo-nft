import React from "react";
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
} from "@mantine/core";
import { Check } from "tabler-icons-react";
// import image from './image.svg';
import tiger from "./assets/tiger.png";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export default function Content({ showMintBtn, onMint }) {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              NFT for helping Ukrainian Zoo
            </Title>
            <Text color="dimmed" mt="md">
              Zoos in Ukraine are in desperate need of assistance right now, and
              will continue to be so once the war is over. The zoos have no
              visitors, which results in no budgeting. We're forming a
              non-profit to aid zoos. You will receive an NFT of a charming
              animal, and the mint fund will be donated to the Ukrainian Zoo.
            </Text>

            {showMintBtn && (
              <Group mt={30}>
                <Button
                  radius="xl"
                  size="md"
                  className={classes.control}
                  onClick={onMint}
                >
                  Mint NFT
                </Button>
              </Group>
            )}
          </div>
          <Image src={tiger} className={classes.image} />
        </div>
      </Container>
    </div>
  );
}
