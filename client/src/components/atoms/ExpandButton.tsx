import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, ViewStyle, TouchableOpacity, Platform } from 'react-native';
// import Plus from '_assets/images/plus.svg';
import { Colors, Mixins, Typography, Common } from '_styles';
import Animated from 'react-native-reanimated';
import { mix, useTransition } from 'react-native-redash';
import { AccordionGroupContext, AccordionGroupContextType } from './AccordionGroup';
import Icon from 'react-native-vector-icons/AntDesign';
import { File, Plus } from '_resources';
type ExpandButtonProps = {
  id?: string;
  title: string;
  fileCount: number;
  isMandatory?: boolean;

  onAdd?: () => void;
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  isExpandable?: boolean;
  customBackground?: boolean;
  maxFileCount?: number;
};

const ExpandButton: React.FC<ExpandButtonProps> = ({
  title,
  fileCount,
  id,
  onAdd,
  contentContainerStyle,
  children,
  customBackground,
  maxFileCount,
}) => {
  const accordionContext = useContext<AccordionGroupContextType>(AccordionGroupContext);
  if (accordionContext !== undefined && !id) {
    throw new Error('ExpandButton is used inside an AccordionGroup without specifying an id prop.');
  }

  const delimiter = '>';
  const [open, setOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const transition = useTransition(open);
  const height = mix(transition, 0, contentHeight);
  const rotateX = mix(transition, Math.PI, 0);
  useEffect(() => {
    if (!fileCount) setOpen(false);
  }, [fileCount]);

  useEffect(() => {
    if (accordionContext?.expandedId !== undefined && id !== undefined) {
      const buttonIdsToExpand = getExpandedButtonIds(accordionContext?.expandedId);
      if (buttonIdsToExpand.indexOf(id) < 0) {
        setOpen(false);
      }
    }
  }, [accordionContext]);

  const handlePress = () => {
    accordionContext?.onAccordionPress(id);
    setOpen((prevState) => !prevState);
    if (!fileCount) {
      handleAdd();
    }
  };

  const handleAdd = () => {
    onAdd && onAdd();
    accordionContext?.onAccordionPress(id);
    setOpen(true);
  };
  const getExpandedButtonIds = (childId: string) => {
    const parts = childId.split(delimiter);
    const buttonIds = [];
    do {
      buttonIds.push(parts.join(delimiter));
      parts.pop();
    } while (parts.length);
    return buttonIds;
  };
  return (
    <>
      <View
        style={styles.contentHeightMeasurer}
        onLayout={(e) => {
          setContentHeight(e.nativeEvent.layout.height);
        }}
      >
        {children}
      </View>
      <View style={[styles.container, customBackground && { backgroundColor: Colors.GRAY }]}>
        <View style={[styles.buttonContainer, customBackground && { backgroundColor: Colors.GRAY }]}>
          <TouchableOpacity style={styles.touchable} onPress={() => handlePress()} activeOpacity={1}>
            {!fileCount ? (
              <File style={{ marginRight: -8, marginLeft: -5 }} />
            ) : (
              <Animated.View style={[{ transform: [{ rotateX }] }]}>
                <Icon name="down" size={18} color={open ? Colors.GREEN : Colors.GRAY_MEDIUM} />
              </Animated.View>
            )}
            <Text style={styles.title}>
              {title}
              <Text style={{ color: Colors.GREEN }}>{` (${fileCount}/${maxFileCount})`}</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 20 }} onPress={handleAdd}>
            {<Plus />}
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.contentContainerStyle, contentContainerStyle, { height: height }]}>
          {children}
        </Animated.View>
      </View>
    </>
  );
};

export default ExpandButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    ...Common.card,
    margin: 10,
  },
  buttonContainer: {
    borderRadius: 12,
    flex: 1,
    ...Mixins.flex_design('row', 'space-between', 'center'),
    backgroundColor: Colors.WHITE,
  },
  touchable: {
    flex: 1,
    ...Mixins.flex_design('row', 'flex-start', 'center'),
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  iconContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  title: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.GRAY_DARK,
    marginLeft: 17,
    flex: 1,
    flexWrap: 'wrap',
  },
  contentContainerStyle: {
    height: 'auto',
    overflow: 'hidden',
  },
  contentHeightMeasurer: {
    marginLeft: -700,
    position: 'absolute',
    opacity: 1,
    width: Platform.select({
      ios: 1,
    }),
  },
});
