import { TestBed } from "@angular/core/testing";

import { ActivityDao } from "./activity.dao";

import * as _ from "lodash";
import { TEST_SYNCED_ACTIVITIES } from "../../../../shared-fixtures/activities-2015.fixture";
import { SyncedActivityModel } from "../../../../../../common/scripts/models/sync/synced-activity.model";

describe("ActivityDao", () => {

	let activityDao: ActivityDao;

	let _TEST_SYNCED_ACTIVITIES_: SyncedActivityModel[] = null;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ActivityDao]
		});

		_TEST_SYNCED_ACTIVITIES_ = _.cloneDeep(TEST_SYNCED_ACTIVITIES);

		// Retrieve injected service
		activityDao = TestBed.get(ActivityDao);
	});

	it("should be created", (done: Function) => {
		expect(activityDao).toBeTruthy();
		done();
	});

	it("should fetch SyncedActivityModels", (done: Function) => {

		// Given
		const browserStorageLocalSpy = spyOn(activityDao, "browserStorageLocal").and.returnValue({
			get: (keys: any, callback: (item: Object) => {}) => {
				callback({computedActivities: _TEST_SYNCED_ACTIVITIES_});
			}
		});

		// When
		const promise: Promise<SyncedActivityModel[]> = activityDao.fetch();

		// Then
		promise.then((result: SyncedActivityModel[]) => {

			expect(result).not.toBeNull();
			expect(result).toEqual(_TEST_SYNCED_ACTIVITIES_);
			expect(result.length).toEqual(_TEST_SYNCED_ACTIVITIES_.length);
			expect(browserStorageLocalSpy).toHaveBeenCalledTimes(1);

			done();

		}, error => {
			expect(error).toBeNull();
			done();
		});
	});

	it("should fetch empty SyncedActivityModels", (done: Function) => {

		// Given
		const browserStorageLocalSpy = spyOn(activityDao, "browserStorageLocal").and.returnValue({
			get: (keys: any, callback: (item: Object) => {}) => {
				callback({computedActivities: null});
			}
		});

		// When
		const promise: Promise<SyncedActivityModel[]> = activityDao.fetch();

		// Then
		promise.then((result: SyncedActivityModel[]) => {

			expect(result).toBeNull();
			expect(browserStorageLocalSpy).toHaveBeenCalledTimes(1);

			done();

		}, error => {
			expect(error).toBeNull();
			done();
		});
	});

	it("should save SyncedActivityModels", (done: Function) => {

		// Given
		const syncedActivityModelsToSave = _TEST_SYNCED_ACTIVITIES_;
		const browserStorageLocalSpy = spyOn(activityDao, "browserStorageLocal").and.returnValue({
			set: (object: Object, callback: () => {}) => {
				callback();
			},
			get: (keys: any, callback: (item: Object) => {}) => {
				callback({computedActivities: syncedActivityModelsToSave});
			}
		});

		// When
		const promise: Promise<SyncedActivityModel[]> = activityDao.save(syncedActivityModelsToSave);

		// Then
		promise.then((result: SyncedActivityModel[]) => {

			expect(result).not.toBeNull();
			expect(result).toEqual(syncedActivityModelsToSave);
			expect(browserStorageLocalSpy).toHaveBeenCalledTimes(2);

			done();

		}, error => {
			expect(error).toBeNull();
			done();
		});
	});

	it("should remove SyncedActivityModels", (done: Function) => {

		// Given
		const browserStorageLocalSpy = spyOn(activityDao, "browserStorageLocal").and.returnValue({
			remove: (key: string, callback: () => {}) => {
				callback();
			},
			get: (keys: any, callback: (item: Object) => {}) => {
				callback({computedActivities: null});
			}
		});

		// When
		const promise: Promise<SyncedActivityModel[]> = activityDao.remove();

		// Then
		promise.then((result: SyncedActivityModel[]) => {

			expect(result).toBeNull();
			expect(browserStorageLocalSpy).toHaveBeenCalledTimes(2);

			done();

		}, error => {
			expect(error).toBeNull();
			done();
		});
	});

	it("should reject remove SyncedActivityModels", (done: Function) => {

		// Given
		const syncedActivityModelsToSave = _TEST_SYNCED_ACTIVITIES_;
		spyOn(activityDao, "browserStorageLocal").and.returnValue({
			remove: (key: string, callback: () => {}) => {
				callback();
			},
			get: (keys: any, callback: (item: Object) => {}) => {
				callback({computedActivities: syncedActivityModelsToSave});
			}
		});

		// When
		const promise: Promise<SyncedActivityModel[]> = activityDao.remove();

		// Then
		promise.then((syncedActivityModels: SyncedActivityModel[]) => {
			expect(syncedActivityModels).toBeNull();
			expect(false).toBeTruthy("Whoops! I should not be here!");
			done();

		}, error => {
			expect(error).toEqual("SyncedActivityModels have not been deleted");
			done();
		});

	});

});
