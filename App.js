import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

const LandscapeText = () => {
  return (
    <>
      <Text style={styles.landscapeText}>
        This text only appears on LANDSCAPE
      </Text>
      <Text style={styles.landscapeText}>
        This text only appears on LANDSCAPE
      </Text>
      <Text style={styles.landscapeText}>
        This text only appears on LANDSCAPE
      </Text>
    </>
  );
};

const PortraitText = () => {
  return (
    <>
      <Text style={styles.portraitContainer}>
        This text only appears on PORTRAIT
      </Text>
      <Text style={styles.portraitContainer}>
        This text only appears on PORTRAIT
      </Text>
      <Text style={styles.portraitContainer}>
        This text only appears on PORTRAIT
      </Text>
    </>
  );
};

export default function App() {
  const [landscape, setLandscape] = useState(false);

  useEffect(() => {
    async function getOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );

      const orientation = await ScreenOrientation.getOrientationAsync();
      if (
        orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT ||
        orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
      ) {
        return setLandscape(true);
      }

      setLandscape(false);
    }

    getOrientation();
  }, []);

  const handleChangeOrientation = useCallback(async () => {
    if (landscape) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );

      setLandscape(false);
    } else {
      setLandscape(true);
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
  }, [landscape]);

  return (
    <>
      <StatusBar backgroundColor="#7159c1" hidden={landscape} />

      <View style={styles.container}>
        {landscape ? (
          <Text>I am in the landscape mode</Text>
        ) : (
          <Text>Open up App.js to start working on your application!</Text>
        )}

        <View
          style={
            landscape ? styles.landscapeContainer : styles.portraitContainer
          }
        >
          {landscape ? <LandscapeText /> : <PortraitText />}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleChangeOrientation}
        >
          <Text>Change orientation</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },

  landscapeContainer: {
    backgroundColor: "tomato",
    padding: 20,
    marginTop: 12,
  },

  portraitContainer: {
    backgroundColor: "pink",
    padding: 16,
    marginTop: 12,
    width: "100%",
  },

  landscapeText: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 8,
  },

  portraitText: {
    color: "#424242",
    fontWeight: "bold",
  },

  button: {
    padding: 16,
    backgroundColor: "#ddd",
    borderRadius: 8,
    marginTop: 20,
  },
});
