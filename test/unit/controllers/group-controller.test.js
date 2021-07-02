const { StatusCodes } = require('http-status-codes');

const mockGroupRequest = {
    params: {
        id: 'uuid here'
    },
    body: {}
};

const mockAddUsersToGroupRequest = {
    body: {
        groupId: 'abc',
        usersIds: ['uuid-here', 'uuid-here-2']
    }
};

const mockResponse = {
    status: jest.fn(),
    send: jest.fn()
};

const mockGroup = {};
const mockError = new Error('error tested');
const mockNextFn = jest.fn();

jest.mock('../../../src/services/group-service', () => ({
    getGroup: jest.fn(),
    addGroup: jest.fn(),
    updateGroup: jest.fn(),
    deleteGroup: jest.fn(),
    addUsersToGroup: jest.fn()
}));
jest.mock('../../../src/middlewares/logger', () => ({
    logControllerError: jest.fn()
}));

const mockGroupService = require('../../../src/services/group-service');
const groupController = require('../../../src/controllers/group-controller');

beforeEach(() => {
    mockResponse.status.mockReturnValue(mockResponse);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('groupController', () => {
    describe('#getGroup', () => {
        test('should call appropriate service method', async () => {
            await groupController.getGroup(mockGroupRequest, mockResponse, mockNextFn);
            expect(mockGroupService.getGroup).toHaveBeenCalledWith(mockGroupRequest.params.id);
        });
        test('should send group recieved from service', async () => {
            mockGroupService.getGroup.mockReturnValueOnce(mockGroup);
            await groupController.getGroup(mockGroupRequest, mockResponse, mockNextFn);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith(mockGroup);
        });
        test('should send error if group is not available', async () => {
            mockGroupService.getGroup.mockReturnValueOnce(null);
            await groupController.getGroup(mockGroupRequest, mockResponse, mockNextFn);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith({ message: `There is no group with id ${mockGroupRequest.params.id}` });
        });
        test('should call next() to invoke errorhandler in case of any error', async () => {
            mockGroupService.getGroup.mockReturnValueOnce(Promise.reject(mockError));
            await groupController.getGroup(mockGroupRequest, mockResponse, mockNextFn);
            expect(mockNextFn).toHaveBeenCalledTimes(1);
            expect(mockNextFn).toHaveBeenCalledWith(mockError);
        });
    });

    describe('#updateGroup', () => {
        test('should call appropriate service method', async () => {
            await groupController.updateGroup(mockGroupRequest, mockResponse, mockNextFn);
            expect(mockGroupService.updateGroup).toHaveBeenCalledWith(mockGroupRequest.params.id, mockGroupRequest.body);
        });
        test('should send group id if completed successfully', async () => {
            mockGroupService.updateGroup.mockReturnValueOnce([1]);
            await groupController.updateGroup(mockGroupRequest, mockResponse, mockNextFn);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith(mockGroupRequest.params.id);
        });
        test('should send error if group is not available', async () => {
            mockGroupService.updateGroup.mockReturnValueOnce([0]);
            await groupController.updateGroup(mockGroupRequest, mockResponse, mockNextFn);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith({ message: `There is no group with id ${mockGroupRequest.params.id}` });
        });
        test('should call next() to invoke errorhandler in case of any error', async () => {
            mockGroupService.updateGroup.mockReturnValueOnce(Promise.reject(mockError));
            await groupController.updateGroup(mockGroupRequest, mockResponse, mockNextFn);
            expect(mockNextFn).toHaveBeenCalledTimes(1);
            expect(mockNextFn).toHaveBeenCalledWith(mockError);
        });
    });

    describe('#deleteGroup', () => {
        test('should call appropriate service method', async () => {
            await groupController.deleteGroup(mockGroupRequest, mockResponse, mockNextFn);
            expect(mockGroupService.deleteGroup).toHaveBeenCalledWith(mockGroupRequest.params.id);
        });
        test('should send appropriate status code if completed successfully', async () => {
            mockGroupService.deleteGroup.mockReturnValueOnce([1]);
            await groupController.deleteGroup(mockGroupRequest, mockResponse, mockNextFn);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
        });
        test('should send error if group is not available', async () => {
            mockGroupService.deleteGroup.mockReturnValueOnce([0]);
            await groupController.deleteGroup(mockGroupRequest, mockResponse, mockNextFn);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith({ message: `There is no group with id ${mockGroupRequest.params.id}` });
        });
        test('should call next() to invoke errorhandler in case of any error', async () => {
            mockGroupService.deleteGroup.mockReturnValueOnce(Promise.reject(mockError));
            await groupController.deleteGroup(mockGroupRequest, mockResponse, mockNextFn);
            expect(mockNextFn).toHaveBeenCalledTimes(1);
            expect(mockNextFn).toHaveBeenCalledWith(mockError);
        });
    });

    describe('#postGroup', () => {
        test('should call appropriate service method', async () => {
            await groupController.postGroup(mockGroupRequest, mockResponse, mockNextFn);
            expect(mockGroupService.addGroup).toHaveBeenCalledWith(mockGroupRequest.body);
        });
        test('should send group if completed successfully', async () => {
            mockGroupService.addGroup.mockReturnValueOnce(mockGroup);
            await groupController.postGroup(mockGroupRequest, mockResponse, mockNextFn);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith(mockGroup);
        });
        test('should call next() to invoke errorhandler in case of any error', async () => {
            mockGroupService.addGroup.mockReturnValueOnce(Promise.reject(mockError));
            await groupController.postGroup(mockGroupRequest, mockResponse, mockNextFn);
            expect(mockNextFn).toHaveBeenCalledTimes(1);
            expect(mockNextFn).toHaveBeenCalledWith(mockError);
        });
    });

    describe('#addUsersToGroup', () => {
        test('should call appropriate service method', async () => {
            const { groupId, usersIds } = mockAddUsersToGroupRequest.body;
            await groupController.addUsersToGroup(mockAddUsersToGroupRequest, mockResponse, mockNextFn);
            expect(mockGroupService.addUsersToGroup).toHaveBeenCalledWith(groupId, usersIds);
        });
        test('should send appropriate status code if completed successfully', async () => {
            await groupController.addUsersToGroup(mockAddUsersToGroupRequest, mockResponse, mockNextFn);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
        });
        test('should call next() to invoke errorhandler in case of any error', async () => {
            mockGroupService.addUsersToGroup.mockReturnValueOnce(Promise.reject(mockError));
            await groupController.addUsersToGroup(mockAddUsersToGroupRequest, mockResponse, mockNextFn);
            expect(mockNextFn).toHaveBeenCalledTimes(1);
            expect(mockNextFn).toHaveBeenCalledWith(mockError);
        });
    });
});
