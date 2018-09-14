import "fancyboxCss";
import "../css/core.css";
import { StravistiX } from "./StravistiX";
import * as $ from "jquery";
import * as fancyboxBoot from "fancybox";
import { CoreMessages } from "./shared/models/core-messages";
import { StartCoreDataModel } from "./shared/models/start-core-data.model";

class Boot {

	public static main(): void {

		fancyboxBoot($);

		addEventListener(CoreMessages.ON_START_CORE_EVENT, (event: any) => {

			const initData: StartCoreDataModel = event.detail as StartCoreDataModel;
			const stravistiX = new StravistiX(initData.userSettings, initData.appResources);
			stravistiX.run();

		});
	}

}

Boot.main();
