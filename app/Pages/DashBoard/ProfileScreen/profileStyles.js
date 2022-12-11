import { StyleSheet, Dimensions } from 'react-native';
import { colors, fonts } from '../../../themes/themes';
import { scaledHeight, scaledWidth } from '../../../utils/Resolution';
const { width, height } = Dimensions.get('window');

const profileStyles = StyleSheet.create({
    topContainerHeight: {
        height: height / 5,
    },
    containerHeight: {
        top: height / 8,
    },
    photo: {
        width: scaledWidth(80),
        height: scaledHeight(80),
        borderColor: colors.white,
        borderWidth: 3,
        borderRadius: 80,
        marginTop: scaledHeight(20),
    },
    profileImageView: {
        width: scaledWidth(100),
        alignItems: 'center',
        justifyContent: 'center',
        height: scaledHeight(100),
        borderRadius: 100,
        borderColor: colors.white,
        borderWidth: 1,
        backgroundColor: colors.profileImage
    },
    profileImageText: {
        color: colors.white,
        fontFamily: fonts.bold,
        fontSize: 80
    },
    nameText: {
        fontSize: 26,
        fontFamily: fonts.bold,
        marginLeft: scaledWidth(14),
        marginTop: scaledHeight(10),
        color: colors.text_color,
        textAlign: 'center'
    },
    locationView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: scaledHeight(5)
    },
    locationText: {
        color: colors.text_color,
        fontFamily: fonts.regular,
        textAlign: 'center',
        fontSize: 14,
        marginLeft: scaledWidth(3),
    },
    bioText: {
        textAlign: 'center',
        color: colors.text_color,
        fontSize: 13,
        marginLeft: scaledWidth(20),
        marginRight: scaledWidth(20),
        fontFamily: fonts.regular,
        fontSize: 15,
        marginTop: scaledHeight(5),
        marginBottom: scaledHeight(5),
    },
});

export default profileStyles;
