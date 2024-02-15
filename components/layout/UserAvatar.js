import { Avatar } from "@mui/material";
import { green } from "@mui/material/colors";

export default function UserAvatar({ name = "Cashup Admin", size = 42 }) {
  const stringAvatar = (str) => {
    let firstCharacter;
    let secondCharacter;
    // Checking if the name containes space or not
    if (str.includes(" ")) {
      const [firstWord, secondWord] = str.split(" ");
      firstCharacter = firstWord[0];
      secondCharacter = secondWord[0];
    } else {
      firstCharacter = str[0];
      secondCharacter = str[1];
    }
    return {
      sx: {
        bgcolor: green[900],
        width: size,
        height: size,
      },
      children: `${firstCharacter}${secondCharacter}`,
    };
  };

  return <Avatar {...stringAvatar(name)} />;
}
