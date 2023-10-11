import { useState, useEffect } from "react";
import { View, Modal } from "react-native";
import Typography from "../../components/atoms/Typography";
import Button from "../../components/molecules/Button";

export function DialogDemo() {

  return <DialogInstance />

}
function DialogInstance() {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (window !== undefined) {
      const styles = window.document?.body?.style || {};
      // const overflow = window?.getComputedStyle(window?.document?.body)?.overflowY;
      styles.overflowY = modalVisible ? 'hidden' : 'auto';
    }
  }, [modalVisible]);

  return (
    <>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(p => !p)}
      >
        <View onClick={(e) => {setModalVisible(p => !p);}} style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(255,255,255,.5)' }}>
          <View onClick={(e) => {e.stopPropagation();}} style={{ backgroundColor: 'red', width: 200, height: 150 }}>
            <Typography>Hello World!</Typography>

            <Button
              onPress={() => {
                setModalVisible(p => !p);
              }}>
              <Typography>Hide Modal</Typography>
            </Button>
          </View>
        </View>
      </Modal>

      <Button
        onPress={() => {
          setModalVisible(true);
        }}>
        <Typography>Show Modal</Typography>
      </Button>
    </>

  )

}
