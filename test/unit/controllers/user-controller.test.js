const { StatusCodes } = require('http-status-codes');

const mockUserRequest = {
    params: {
        id: 'uuid here'
    },
    body: {}
};

const mockSuggestionRequest = {
    query: {
        loginSubstring: 'abc',
        limit: 2
    }
};

const mockResponse = {
    status: jest.fn(),
    send: jest.fn()
};

const mockUser = {};
const mockSuggestedUsers = [{}, {}];
const mockError = new Error('error tested');
const mockNextFn = jest.fn();

jest.mock('../../../src/services/user-service', () => ({
    getUser: jest.fn(),
    getUserByCreds: jest.fn(),
    addUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    getAutoSuggestedUsers: jest.fn()
}));
jest.mock('../../../src/middlewares/logger', () => ({
    logControllerError: jest.fn()
}));

const mockUserService = require('../../../src/services/user-service');
const userController = require('../../../src/controllers/user-controller');

beforeEach(() => {
    mockResponse.status.mockReturnValue(mockResponse);
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('userController', () => {
    describe('#getUser', () => {
        test('should call appropriate service method', async () => {
            await userController.getUser(mockUserRequest, mockResponse, mockNextFn);
            expect(mockUserService.getUser).toHaveBeenCalledWith(mockUserRequest.params.id);
        });
        test('should send user recieved from service', async () => {
            mockUserService.getUser.mockReturnValueOnce(mockUser);
            await userController.getUser(mockUserRequest, mockResponse, mockNextFn);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith(mockUser);
        });
        test('should send error if user is not available', async () => {
            mockUserService.getUser.mockReturnValueOnce(null);
            await userController.getUser(mockUserRequest, mockResponse, mockNextFn);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith({ message: `There is no user with id ${mockUserRequest.params.id}` });
        });
        test('should call next() to invoke errorhandler in case of any error', async () => {
            mockUserService.getUser.mockReturnValueOnce(Promise.reject(mockError));
            await userController.getUser(mockUserRequest, mockResponse, mockNextFn);
            expect(mockNextFn).toHaveBeenCalledTimes(1);
            expect(mockNextFn).toHaveBeenCalledWith(mockError);
        });
    });

    describe('#updateUser', () => {
        test('should call appropriate service method', async () => {
            await userController.updateUser(mockUserRequest, mockResponse, mockNextFn);
            expect(mockUserService.updateUser).toHaveBeenCalledWith(mockUserRequest.params.id, mockUserRequest.body);
        });
        test('should send user id if completed successfully', async () => {
            mockUserService.updateUser.mockReturnValueOnce([1]);
            await userController.updateUser(mockUserRequest, mockResponse, mockNextFn);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith(mockUserRequest.params.id);
        });
        test('should send error if user is not available', async () => {
            mockUserService.updateUser.mockReturnValueOnce([0]);
            await userController.updateUser(mockUserRequest, mockResponse, mockNextFn);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith({ message: `There is no user with id ${mockUserRequest.params.id}` });
        });
        test('should call next() to invoke errorhandler in case of any error', async () => {
            mockUserService.updateUser.mockReturnValueOnce(Promise.reject(mockError));
            await userController.updateUser(mockUserRequest, mockResponse, mockNextFn);
            expect(mockNextFn).toHaveBeenCalledTimes(1);
            expect(mockNextFn).toHaveBeenCalledWith(mockError);
        });
    });

    describe('#deleteUser', () => {
        test('should call appropriate service method', async () => {
            await userController.deleteUser(mockUserRequest, mockResponse, mockNextFn);
            expect(mockUserService.deleteUser).toHaveBeenCalledWith(mockUserRequest.params.id);
        });
        test('should send appropriate status code if completed successfully', async () => {
            mockUserService.deleteUser.mockReturnValueOnce([1]);
            await userController.deleteUser(mockUserRequest, mockResponse, mockNextFn);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
        });
        test('should send error if user is not available', async () => {
            mockUserService.deleteUser.mockReturnValueOnce([0]);
            await userController.deleteUser(mockUserRequest, mockResponse, mockNextFn);
            expect(mockResponse.status).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith({ message: `There is no user with id ${mockUserRequest.params.id}` });
        });
        test('should call next() to invoke errorhandler in case of any error', async () => {
            mockUserService.deleteUser.mockReturnValueOnce(Promise.reject(mockError));
            await userController.deleteUser(mockUserRequest, mockResponse, mockNextFn);
            expect(mockNextFn).toHaveBeenCalledTimes(1);
            expect(mockNextFn).toHaveBeenCalledWith(mockError);
        });
    });

    describe('#postUser', () => {
        test('should call appropriate service method', async () => {
            await userController.postUser(mockUserRequest, mockResponse, mockNextFn);
            expect(mockUserService.addUser).toHaveBeenCalledWith(mockUserRequest.body);
        });
        test('should send user if completed successfully', async () => {
            mockUserService.addUser.mockReturnValueOnce(mockUser);
            await userController.postUser(mockUserRequest, mockResponse, mockNextFn);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith(mockUser);
        });
        test('should call next() to invoke errorhandler in case of any error', async () => {
            mockUserService.addUser.mockReturnValueOnce(Promise.reject(mockError));
            await userController.postUser(mockUserRequest, mockResponse, mockNextFn);
            expect(mockNextFn).toHaveBeenCalledTimes(1);
            expect(mockNextFn).toHaveBeenCalledWith(mockError);
        });
    });

    describe('#suggestUsers', () => {
        test('should call appropriate service method', async () => {
            const { loginSubstring, limit } = mockSuggestionRequest.query;
            await userController.suggestUsers(mockSuggestionRequest, mockResponse, mockNextFn);
            expect(mockUserService.getAutoSuggestedUsers).toHaveBeenCalledWith(loginSubstring, limit);
        });
        test('should send array of users if completed successfully', async () => {
            mockUserService.getAutoSuggestedUsers.mockReturnValueOnce(mockSuggestedUsers);
            await userController.suggestUsers(mockSuggestionRequest, mockResponse, mockNextFn);
            expect(mockResponse.send).toHaveBeenCalledTimes(1);
            expect(mockResponse.send).toHaveBeenCalledWith(mockSuggestedUsers);
        });
        test('should call next() to invoke errorhandler in case of any error', async () => {
            mockUserService.getAutoSuggestedUsers.mockReturnValueOnce(Promise.reject(mockError));
            await userController.suggestUsers(mockSuggestionRequest, mockResponse, mockNextFn);
            expect(mockNextFn).toHaveBeenCalledTimes(1);
            expect(mockNextFn).toHaveBeenCalledWith(mockError);
        });
    });
});
