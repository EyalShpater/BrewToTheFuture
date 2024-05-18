import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";

// home screen
import Welcome from "../screens/welcome/Welcome";
import Savedrecipes from "./common/cards/SavedRec/SavedRecipesCard";

// job details screen
import Company from "./jobdetails/company/Company";
import { default as JobTabs } from "./jobdetails/tabs/Tabs";
import { default as JobAbout } from "./jobdetails/about/About";
import { default as JobFooter } from "./jobdetails/footer/Footer";
import Specifics from "./jobdetails/specifics/Specifics";

export {
  ScreenHeaderBtn,
  Welcome,
  Savedrecipes as Popularjobs,
  Company,
  JobTabs,
  JobAbout,
  JobFooter,
  Specifics,
};
