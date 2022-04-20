
declare module 'zoom-sdk' {
  export interface ZoomSDKOpts {
    path: string,
    domain: string,
    langname?: string,
    langinfo?: string,
    langtype?: number,
    strSupportUrl?: string,
    langid?: number,
    enable_log?: boolean,
    locale?: number,
    logfilesize?: number,
    enableGenerateDump?: boolean,
    permonitorAwarenessMode?: boolean,
    videoRenderMode?: number,
    videoRawdataMemoryMode?: number,
    shareRawdataMemoryMode?: number,
    audioRawdataMemoryMode?: number,
    enableRawdataIntermediateMode?: boolean,
    renderPostProcessing?: number,
    videoCaptureMethod?: number,
    identifier?: string,
    customLocalizationFilePath?: string,
    useCustomUI?: number,
    strBrandingName?: number,
  }
  export interface ZoomSDK {
    /**
     * Initialize Zoom SDK.
     * @method InitSDK
     * @param {String} path [Required] sdk.dll path on win os or mac os.
     * @param {String} domain [Required]
     * @param {String} langname [Optional]
     * @param {String} langinfo [Optional]
     * @param {Number} langtype [Optional] ZNCustomizedLanguageType
     * @param {String} strSupportUrl [Optional]
     * @param {Number} langid [Optional] ZoomSDK_LANGUAGE_ID,
     * @param {Boolean} enable_log [Optional]
     * @param {Number} locale [Optional] see ZoomAPPLocale in setings.js
     * @param {Number} logfilesize [Optional] Size of a log file in M(megabyte). The default size is 5M. There are 5 log files in total and the file size varies from 1M to 50M.
     * @param {Boolean} enableGenerateDump [Optional]
     * @param {Boolean} permonitorAwarenessMode [Optional]
     * @param {Number} videoRenderMode [Optional]
     * @param {Number} videoRawdataMemoryMode [Optional]
     * @param {Number} shareRawdataMemoryMode [Optional]
     * @param {Number} audioRawdataMemoryMode [Optional]
     * @param {Boolean} enableRawdataIntermediateMode [Optional]
     * @param {Number} renderPostProcessing [Optional]
     * @param {Number} videoCaptureMethod [Optional]
     * @param {String} identifier [Optional] After you re-sign the SDK, you should set the team identifier of your certificate, Zoom will verify the certificate when loading. _teamIdentifier is subject.OU value of the signing certificate.
         only support for MAC platform
    * @param {String} customLocalizationFilePath [Optional] Set custom localizable string file path. only support for MAC platform
    * @param {Number} useCustomUI [Optional] whether to use the custom UI mode
    * @param {Number} strBrandingName [Optional] Branding name
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
            Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    InitSDK(opts: ZoomSDKOpts): settings.ZoomSDKError;

    /**
     * Get the version of Zoom SDK
     * @method GetZoomSDKVersion
     * @return {String} The version of Zoom SDK
     */
    moduleGetZoomSDKVersion(): string;

    /**
     * Clean up Zoom SDK.
     * @method CleanUPSDK
     * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
            Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    CleanUPSDK(): settings.ZoomSDKError;

    /**
     * Zoom SDK Authentication Service Init
     * @module zoom_auth
     * @param {Function} authcb Authentication result callback.
     * @param {Function} logoutcb Logout result callback.
     * @param {Function} onZoomIdentityExpired Zoom identity has expired, please re-login or generate a new Zoom access token via REST Api.
     * @param {Function} onZoomAuthIdentityExpired Zoom authentication identity will be expired in 10 minutes, please re-auth.
     * @param {Function} onLoginReturnWithReason Callback of login result with fail reason.
     * @return {ZoomAuth}
     */
    GetAuth(opts: {
      authcb?: (status: settings.ZoomAuthResult) => void,
      logoutcb?: () => void,
      onZoomIdentityExpired?: () => void,
      onZoomAuthIdentityExpired?: () => void,
      onLoginReturnWithReason?: (loginStatus: settings.ZoomAuthResult, loginFailReason: settings.LoginFailReason) => void,
    }): ZoomAuth;

    /**
       * Zoom Meeting
       * @module zoom_meeting
       * @param {Function} meetingstatuscb Meeting status changed callback.
       * @return {ZoomMeeting}
       */
    GetMeeting(opts: { meetingstatuscb: MeetingStatusCB }): ZoomMeeting;

    GetSetting(): ZoomSettings;

    GetCustomizedResource(): ZoomCustomizedResource;

    // RawData(opts: unknown): unknown;

    // SMSHelper(opts: unknown): unknown;
  }

  export interface ZoomSettings {

    /**
    * Display Meeting Setting dialog.
    * @method SettingUI_ShowTheSettingDlg
    * @param {String} hParent parent setting handle (require hexadecimal)
    * @param {String} left setting dlg left pos
    * @param {String} top setting dlg top pos
    * @param {String} hSettingWnd Setting Wnd (require hexadecimal)
    * @param {Boolean} bShow show or not
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    SettingUI_ShowTheSettingDlg(opts: {
      hParent: string,
      left: string,
      top: string,
      hSettingWnd: string,
      bShow: boolean,
    }): settings.ZoomSDKError;

    /**
     * Hide meeting setting dialog.
     * @method SettingUI_HideSettingDlg
     * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    SettingUI_HideSettingDlg(): settings.ZoomSDKError;

    // GetGeneralSetting(opts): ZoomGeneralSetting;


    /**
     * Zoom Video Setting
     * @module zoom_setting_video
     * @param {Function} onComputerCamDeviceChanged Callback event if the SDK detects that the computer camera devices have been changed.
     * @param {Function} onDefaultCamDeviceChanged Notify the user that a camera device is selected.
     * @return {ZoomVideoSetting}
     */
    GetVideoSetting(opts?: {
      onComputerCamDeviceChanged?: (newCameraList: ZoomDeviceInfo[]) => void,
      onDefaultCamDeviceChanged?: (deviceId: string, deviceName: string) => void,
    }): ZoomVideoSetting;


    /**
    * Zoom Audio Setting
    * @module zoom_setting_audio
    * @param {Function} onComputerMicDeviceChanged Callback event if the SDK detects that the computer mic devices have been changed.
    * @param {Function} onComputerSpeakerDeviceChanged Callback event if the SDK detects that the computer speaker devices have been changed.
    * @param {Function} onDefaultMicDeviceChanged Notify the user that a microphone device is selected.
    * @param {Function} onDefaultSpeakerDeviceChanged Notify the user that a speaker device is selected.
    * @return {ZoomAudioSetting}
    */
    GetAudioSetting(opts?: {
      onComputerMicDeviceChanged?: (newMicList: ZoomDeviceInfo[]) => void,
      onComputerSpeakerDeviceChanged?: (newSpeakerList: ZoomDeviceInfo[]) => void,
      onDefaultMicDeviceChanged?: (deviceId: string, deviceName: string) => void,
      onDefaultSpeakerDeviceChanged?: (deviceId: string, deviceName: string) => void,
    }): ZoomAudioSetting;

    GetShareSetting(): ZoomShareSetting;
    // GetRecordingSetting(opts): ZoomRecordingSetting;
    // GetSettingUICtrl(opts): ZoomSettingUICtrl;
    // GetSettingStatisticCtrl(opts): ZoomSettingStatisticCtrl;
    // GetSettingAccessibilityCtrl(opts): ZoomSettingAccessibilityCtrl;
  }

  export type ZoomDeviceInfo = {
    deviceName: string,
    deviceId: string,
    isSelected: boolean,
  };

  export interface ZoomAuth {
    /**
       * Set auth callback function.
       * @method SetOnAuthReturnCB
       * @param {Function} authcb
       * @return {Boolean} true or false
       */
    SetOnAuthReturnCB(authcb: (result: settings.ZoomAuthResult) => void): boolean

    /**
       * Set logout callback function.
       * @method SetLogoutCB
       * @param {Function} logoutcb
       * @return {Boolean} true or false
       */
    SetLogoutCB(logoutcb: () => void): boolean;

    /**
       * Set Zoom identity expired callback function.
       * @method SetOnZoomIdentityExpiredCB
       * @param {Function} onZoomIdentityExpired
       * @return {Boolean} true or false
       */
    SetOnZoomIdentityExpiredCB(onZoomIdentityExpired: () => void): boolean;

    /**
       * Set On Zoom Auth Identity Expired Callback
       * @method SetOnZoomAuthIdentityExpiredCB
       * @param {Function} onZoomAuthIdentityExpired
       * @return {Boolean} true or false
       */
    SetOnZoomAuthIdentityExpiredCB(onZoomAuthIdentityExpired: () => void): boolean;

    /**
     * Set Login Return With Reason Callback
     * @method SetLoginReturnWithReasonCB
     * @param {Function} onLoginReturnWithReason
     * @return {Boolean} true or false
     */
    SetLoginReturnWithReasonCB(onLoginReturnWithReason: (loginStatus: settings.ZoomAuthResult, loginFailReason: settings.LoginFailReason | undefined) => void): boolean;

    /**
     * SDK Auth
     * @method SDKAuth
     * @param {String} appkey
     * @param {String} appsecret
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    SDKAuth(appkey: string, appsecret: string): settings.ZoomSDKError;

    /**
     * Generate SSO Login Web URL.
     * @method GenerateSSOLoginWebURL
     * @param {String} prefixOfVanityUrl The prefix of vanity url.
     * @return {Number} If the function succeeds,will return url of can launch app. Defined in: {@link ZoomSDKError}
     */
    GenerateSSOLoginWebURL(opts: { prefixOfVanityUrl: string }): settings.ZoomSDKError;

    /**
     * Login ZOOM with SSO token.
     * @method SSOLoginWithWebUriProtocol
     * @param {String} uriProtocol For the parameter to be used for sso account login.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    SSOLoginWithWebUriProtocol(opts: { uriProtocol: string }): settings.ZoomSDKError;

    /**
     * Account Logout
     * @method Logout
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    Logout(): settings.ZoomSDKError;

    /**
       * Auth With Jwt Token
       * @method AuthWithJwtToken
       * @param {String} sdk_context
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
    AuthWithJwtToken(sdk_context: string): settings.ZoomSDKError;

    /**
      * Get Authentication Status
      * @method GetAuthResult
      * @return {Number} Defined in: {@link ZoomAuthResult}
      */
    GetAuthResult(): settings.ZoomAuthResult;

    /**
      * Get Login Status
      * @method GetLoginStatus
      * @return {Number} Defined in: {@link ZoomAuthResult}
      */
    GetLoginStatus(): settings.ZoomAuthResult;

    /**
      * Get the webinal legal notices prompt.
      * @method GetWebinalLegalNoticesPrompt
      * @return {String}
      */
    GetWebinalLegalNoticesPrompt(): string;

    /**
      * Get the webinal legal notices explained.
      * @method GetWebinalLegalNoticesExplained
      * @return {Object} contains explained_content, url_register_account_owner, url_register_privacy_policy, url_register_terms
      */
    GetWebinalLegalNoticesExplained(): WebinalLegalNoticesExplained;

    // GetDirectShare(): ZoomDirectShareHelper | ZoomSDKError.SDKERR_UNAUTHENTICATION | ZoomSDKError.SDKERR_UNINITIALIZE;
  }

  export interface WebinalLegalNoticesExplained {
    explained_content: string,
    url_register_account_owner: string,
    url_register_privacy_policy: string,
    url_register_terms: string,
  }

  /**
    Meeting status changed callback.
    @event meetingstatuscb
    @param {String} meetingStatus The value of meeting. Defined in: {@link ZoomMeetingStatus}
    @param {String} result Detailed reasons for special meeting status.
      If the status is MEETING_STATUS_FAILED, the value of iResult is one of those listed in MeetingFailCode enum.
      If the status is MEETING_STATUS_ENDED, the value of iResult is one of those listed in MeetingEndReason.
  */
  export type MeetingStatusCB = (status: settings.ZoomMeetingStatus, result: string | settings.MeetingEndReason | undefined) => void;

  export interface ZoomMeeting {
    /**
    * Set meeting status changed callback function.
    * @method SetMeetingStatusCB
    * @param {Function} meetingstatuscb
    * @return {Boolean}
    */
    SetMeetingStatusCB(meetingstatuscb: MeetingStatusCB): boolean;

    /**
      * Start meeting.
      * @method StartMeeting
      * @param {Number} meetingnum A number to the meeting to be started.
      * @param {String} directshareappwndhandle Windows handle of which window you want to share directly (require hexadecimal)
      * @param {String} customer_key The customer key that need the app intergrated with sdk to specify. The SDK will set this value when the associated settings are turned on
      * @param {Boolean} isvideooff
      * @param {Boolean} isaudiooff
      * @param {Boolean} isdirectsharedesktop
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    StartMeeting(opts: {
      meetingnum: number,
      directshareappwndhandle: string,
      customer_key?: string,
      isvideooff?: boolean,
      isaudiooff?: boolean,
      isdirectsharedesktop?: boolean
    }): settings.ZoomSDKError;

    /**
      * Start meeting without login
      * @method StartMeetingWithOutLogin
      * @param {String} userid [Required] User ID
      * @param {String} usertoken [Required] User token
      * @param {String} zoomaccesstoken [Required] Zoom access token
      * @param {String} username [Required] User Name
      * @param {Number} zoomusertype [Required] User type, See ZoomUserType in settings.js
      * @param {Number} meetingnum [Optinal] Meeting number, meetingnum or vanityid is Required
      * @param {String} vanityid [Optinal] vanityid is suffix of Personal Link, meetingnum or vanityid is Required
      * @param {Number} directshareappwndhandle [Optinal] The window handle of the direct sharing application (require hexadecimal)
      * @param {String} customer_key [Optinal] The customer key that need the app intergrated with sdk to specify. The SDK will set this value when the associated settings are turned on
      * @param {Boolean} isdirectsharedesktop [Optinal] Share the desktop directly or not. True indicates to share
      * @param {Boolean} isvideooff [Optinal] Turn off the video or not, True indicates to turn off. In addition, this flag is affected by meeting attributes
      * @param {Boolean} isaudiooff [Optinal] Turn off the audio or not, True indicates to turn off. In addition, this flag is affected by meeting attributes.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
    StartMeetingWithOutLogin(opts: {
      userid: string,
      usertoken: string,
      zoomaccesstoken: string,
      username: string,
      zoomusertype: settings.ZoomUserType,
      meetingnum?: number,
      vanityid?: string,
      directshareappwndhandle?: number,
      customer_key?: string,
      isdirectsharedesktop?: boolean,
      isvideooff?: boolean,
      isaudiooff?: boolean,
    }): settings.ZoomSDKError;

    /**
      * Join the meeting.
      * @method JoinMeeting
      * @param {Number} meetingnum A number to the meeting to be joined, meetingnum or vanityid is Required
      * @param {String} vanityid vanityid is suffix of Personal Link, meetingnum or vanityid is Required
      * @param {String} username
      * @param {String} psw Meeting password
      * @param {Number} directshareappwndhandle Windows handle of which window you want to share directly (require hexadecimal)
      * @param {String} customer_key The customer key that need the app intergrated with sdk to specify. The SDK will set this value when the associated settings are turned on
      * @param {String} webinartoken webinar token
      * @param {Boolean} isvideooff
      * @param {Boolean} isaudiooff
      * @param {Boolean} isdirectsharedesktop
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    JoinMeeting(opts: {
      meetingnum?: number,
      vanityid?: string,
      username: string,
      psw: string,
      directshareappwndhandle?: string,
      customer_key?: string,
      webinartoken?: string,
      isvideooff?: boolean,
      isaudiooff?: boolean,
      isdirectsharedesktop?: boolean
    }): settings.ZoomSDKError;

    /**
      * Join meeting withoutlogin
      * @method JoinMeetingWithoutLogin
      * @param {Number} meetingnum [Required] Meeting Number, meetingnum or vanityid is Required
      * @param {String} vanityid [Optinal] vanityid is suffix of Personal Link, meetingnum or vanityid is Required
      * @param {String} username [Optinal] User Name
      * @param {String} psw [Optinal] Meeting password
      * @param {Number} directshareappwndhandle: [Optinal] The window handle of the direct sharing application (require hexadecimal)
      * @param {String} toke4enfrocelogin [Optinal] Use the token if the meeting required to login at first
      * @param {String} customer_key [Optinal] The customer key that need the app intergrated with sdk to specify. The SDK will set this value when the associated settings are turned on
      * @param {String} webinartoken [Optinal] Webinar token, if try to join webinar as a panelist
      * @param {Boolean} isdirectsharedesktop [Optinal] Share the desktop directly or not. True indicates to share
      * @param {Boolean} isvideooff [Optinal] Turn off the video or not. True indicates to turn off. In addition, this flag is affected by meeting attributes
      * @param {Boolean} isaudiooff [Optinal] Turn off the audio or not. True indicates to turn off. In addition, this flag is affected by meeting attributes
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
    JoinMeetingWithoutLogin(opts: {
      meetingnum?: number,
      vanityid?: string,
      username: string,
      psw: string,
      directshareappwndhandle?: number,
      toke4enfrocelogin?: string,
      customer_key?: string,
      webinartoken?: string,
      isdirectsharedesktop?: boolean,
      isvideooff?: boolean,
      isaudiooff?: boolean
    }): settings.ZoomSDKError;

    /**
      * Leave meeting.
      * @method LeaveMeeting
      * @param {Boolean} endMeeting
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    LeaveMeeting(opts: { endMeeting?: boolean }): settings.ZoomSDKError;

    /**
       * Lock the current meeting.
       * @method Lock_Meeting
       * @return {Number} If the function succeed, the return value is the SDKERR_SUCCESS.
            Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    Lock_Meeting(): settings.ZoomSDKError;

    /**
      * Unlock the current meeting.
      * @method Un_lock_Meeting
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    Un_lock_Meeting(): settings.ZoomSDKError;

    /**
      * Get the quality of Internet connection when sharing.
      * If you are not in the meeting, the Conn_Quality_Unknow will be returned.
      * @method GetSharingConnQuality
      * @return {Number} If the function succeed, the return is one of those enums Defined in: {@link ConnectionQuality}
      */
    GetSharingConnQuality(): settings.ConnectionQuality;

    /**
     * Get the Internet connection quality of video.
     * If you are not in the meeting, the Conn_Quality_Unknow will be returned.
     * @method GetVideoConnQuality
     * @return {Number} If the function succeed, the return is one of those enums Defined in: {@link ConnectionQuality}
     */
    GetVideoConnQuality(): settings.ConnectionQuality;

    /**
     * Get the Internet connection quality of audio.
     * If you are not in the meeting, the Conn_Quality_Unknow will be returned.
     * @method GetAudioConnQuality
     * @return {AudioConnQuality} If the function succeed, the return is one of those enums Defined in: {@link ConnectionQuality}
     */
    GetAudioConnQuality(): settings.ConnectionQuality;

    /**
       * Join meeting with web uri
       * @method HandleZoomWebUriProtocolAction
       * @param {String} protocol_action
       * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
            Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
       */
    HandleZoomWebUriProtocolAction(opts: { protocol_action: string }): settings.ZoomSDKError;

    /**
     * Zoom Meeting Info
     * @module zoom_meeting_info
     * @return {ZoomMeetingInfo}
     */
    GetMeetingInfo(): ZoomMeetingInfo;


    /**
    * Zoom Meeting UI Ctrl
    * @module zoom_meeting_ui_ctrl
    * @param {Function} onInvitebuttonclickedcb Callback event to click the INVITE button.
    * @param {Function} onStartShareBtnClicked Callback event for clicking START SHARE button.
    * @param {Function} onEndMeetingBtnClicked Callback event of clicking the END MEETING button.
    * @param {Function} onParticipantListBtnClicked Callback event of clicking PRTICIPANT LIST button.
    * @param {Function} onCustomLiveStreamMenuClicked  Callback event of clicking CUSTOME LIVE STREAM menu.
    * @param {Function} onZoomInviteDialogFailed Notification occurs only when the SDK fails to display the default Zoom INVITE dialog.
    * @param {Function} onCCBTNClicked Callback event of clicking CC menu.
    * @param {Function} onAudioBtnClicked Callback event for clicking Audio button in the meeting.
    * @param {Function} onAudioMenuBtnClicked Callback event for clicking Audio Menu button in the meeting.
    * @return {ZoomMeetingUICtrl}
    */
    GetMeetingUICtrl(opts?: {
      onInvitebuttonclickedcb?: () => void,
      onStartShareBtnClicked?: () => void,
      onEndMeetingBtnClicked?: () => void,
      onParticipantListBtnClicked?: () => void,
      onCustomLiveStreamMenuClicked?: () => void,
      onZoomInviteDialogFailed?: () => void,
      onCCBTNClicked?: () => void,
      onAudioBtnClicked?: () => void,
      onAudioMenuBtnClicked?: () => void,
    }): ZoomMeetingUICtrl;

    // GetAnnotationCtrl(): ZoomAnnotationCtrl;


    /**
     * Zoom Meeting Audio
     * @module zoom_meeting_audio
     * @param {Function} onUserAudioStatusChange User's audio status changed callback.
     * @param {Function} onUserActiveAudioChange The callback event that users whose audio is active changed.
     * @return {ZoomMeetingAudio}
     */
    GetMeetingAudio(opts?: {
      onUserAudioStatusChange?: (lstAudioStatusChange: string) => void,
      onUserActiveAudioChange?: (lstActiveAudio: string) => void,
    }): ZoomMeetingAudio;


    /**
     * Zoom Meeting Video
     * @module zoom_meeting_video
     * @param {Function} onUserVideoStatusChange Callback event of the user video status changes.
     * @param {Function} onActiveSpeakerVideoUserChanged Callback event of the active speaker video user changes.
     * @param {Function} onActiveVideoUserChanged Callback event of the active video user changes.
     * @return {ZoomMeetingVideo}
     */
    GetMeetingVideo(opts?: {
      onUserVideoStatusChange?: (userId: number, status: settings.ZoomMeetingVideoStatus) => void,
      onActiveSpeakerVideoUserChanged?: (userId: number) => void,
      onActiveVideoUserChanged?: (userId: number) => void,
    }): ZoomMeetingVideo;

    
    /**
     * Zoom Meeting Share
     * @module zoom_meeting_share
     * @param {Function} onSharingStatus Callback event of the changed sharing status.
     * @return {ZoomMeetingShare}
     */
    GetMeetingShare(opts?: {
      onSharingStatus?: (info: {ShareStatus: settings.ZNShareStatus, userId: number}) => void,
    }): ZoomMeetingShare;

    // GetMeetingH323(): ZoomH323;

    /**
    * Zoom Meeting Configuration
    * @module zoom_meeting_configuration
    * @param {Function} onFreeMeetingNeedToUpgrade The callback of upgrading the free meeting.
    * @param {Function} onFreeMeetingUpgradeToGiftFreeTrialStart Callback function of starting to upgrade the free meeting by the gift link.
    * @param {Function} onFreeMeetingUpgradeToGiftFreeTrialStop Callback function of ending upgrade the free meeting by the gift link.
    * @param {Function} onFreeMeetingUpgradeToProMeeting Callback function of free meting upgrades successfully.
    * @param {Function} onInputMeetingPasswordAndScreenNameNotification The SDK will trigger the callback event if the password or screen name is required.
    * @param {Function} onAirPlayInstructionWndNotification This callback event may be triggered when the user enables the AirPlay introduction.
    * @param {Function} onWebinarNeedRegisterNotification During the webinar, this callback event will be triggered if the user needs to register.
    * @param {Function} onEndOtherMeetingToJoinMeetingNotification The user will receive this callback event if the user wants to join the new meeting while the ongoing meeting is not ended.
    * @param {Function} onFreeMeetingRemainTime The SDK will trigger this callback event during the free meeting to inform the user how much time is left for a free meeting.
    * @param {Function} onFreeMeetingRemainTimeStopCountDown The callback of free meeting stops the countdown.
    * @return {ZoomMeetingConfiguration}
    */
    GetMeetingConfiguration(opts?: {
      onFreeMeetingNeedToUpgrade?: (type: settings.FreeMeetingNeedUpgradeType, gift_url: string) => void,
      onFreeMeetingUpgradeToGiftFreeTrialStart?: () => void,
      onFreeMeetingUpgradeToGiftFreeTrialStop?: () => void,
      onFreeMeetingUpgradeToProMeeting?: () => void,
      onInputMeetingPasswordAndScreenNameNotification?: () => void,
      onAirPlayInstructionWndNotification?: (bShow: boolean, airhostName: string) => void,
      onWebinarNeedRegisterNotification?: () => void,
      onEndOtherMeetingToJoinMeetingNotification?: () => void,
      onFreeMeetingRemainTime?: (leftTime: string) => void,
      onFreeMeetingRemainTimeStopCountDown?: () => void,
    }): ZoomMeetingConfiguration;

    // GetUpdateAccount(): ZoomPaymentReminder;

    /**
     * Zoom Meeting Participants Ctrl
     * @module zoom_meeting_participants_ctrl
     * @param {Function} meetinguserjoincb Callback event of notification of users who are in the meeting.
     * @param {Function} meetinguserleftcb Callback event of notification of user who leaves the meeting.
     * @param {Function} meetinghostchangecb Callback event of notification of the new host.
     * @return {ZoomMeetingParticipantsCtrl}
     */
    GetMeetingParticipantsCtrl(opts?: {
      meetinguserjoincb?: (lstUserID: number) => void,
      meetinguserleftcb?: (lstUserID: number) => void,
      meetinghostchangecb?: (userId: number) => void,
    }): ZoomMeetingParticipantsCtrl;

    // GetMeetingRecording(): ZoomMeetingRecording;

    // GetMeetingAAN(): ZoomMeetingAAN;
  }

  export interface ZoomMeetingVideo {
    /**
    * Set callback function of notification of the user video status changes.
    * @method MeetingVideo_SetMeetingVideoStatusCB
    * @param {Function} onUserVideoStatusChange
    * @return {Boolean}
    */
    MeetingVideo_SetMeetingVideoStatusCB(onUserVideoStatusChange: (userId: number, status: settings.ZoomMeetingVideoStatus) => void): boolean;

    /**
    * Set callback function of notification of the active speaker video user changes.
    * @method MeetingVideo_SetActiveSpeakerVideoUserChangedCB
    * @param {Function} onActiveSpeakerVideoUserChanged
    * @return {Boolean}
    */
    MeetingVideo_SetActiveSpeakerVideoUserChangedCB(onActiveSpeakerVideoUserChanged: (userId: number) => void): boolean;

    /**
    * Set callback function of notification of the active video user changes.
    * @method MeetingVideo_SetActiveVideoUserChangedCB
    * @param {Function} onActiveVideoUserChanged
    * @return {Boolean}
    */
    MeetingVideo_SetActiveVideoUserChangedCB(onActiveVideoUserChanged: (userId: number) => void): boolean;

    /**
    * Turn off the user's own video.
    * @method MeetingVideo_MuteVideo
    * @param {Number} userid Specifies which the user's video to mute
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    MeetingVideo_MuteVideo(opts: {
      userid: number,
    }): settings.ZoomSDKError;

    /**
    * Turn on the user's own video.
    * @method MeetingVideo_UnMuteVideo
    * @param {Number} userid Specifies which the user's video to unmute
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    MeetingVideo_UnMuteVideo(opts: {
      userid: number,
    }): settings.ZoomSDKError;

    /**
    * pin video
    * @method MeetingVideo_PinVideo
    * @param {Boolean} bPin bPin or not
    * @param {Boolean} bFirstView bFirstView or not
    * @param {Number} userid Specifies which the user's video to pin
    * @return {Number} Defined in: {@link ZoomSDKError}
    */
    MeetingVideo_PinVideo(opts: {
      bPin: boolean,
      bFirstView: boolean,
      userid: number
    }): settings.ZoomSDKError;

    /**
    * Spotlight the video of the assigned user to the first view.
    * @method MeetingVideo_SpotlightVideo
    * @param {Boolean} bSpotlight bSpotlight or not
    * @param {Number} userid Specifies which the user's video to pin
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    MeetingVideo_SpotlightVideo(opts: {
      bSpotlight: boolean,
      userid: number
    }): settings.ZoomSDKError;

    /**
    * Display or not the user who does not turn on the video in the video all mode.
    * @method MeetingVideo_HideOrShowNoVideoUserOnVideoWall
    * @param {Boolean} bHide bHide or not
    * @return {Number} TRUE indicates to hide, FALSE show.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    MeetingVideo_HideOrShowNoVideoUserOnVideoWall(opts: {
      bHide: boolean
    }): settings.ZoomSDKError;
  }

  export interface ZoomMeetingParticipantsCtrl {
    /**
     * Set callback function of notification of users who are in the meeting.
     * @method SetMeetingUserJoinCB
     * @param {Function} meetinguserjoincb
     * @return {Boolean}
     */
    SetMeetingUserJoinCB(meetinguserjoincb: (lstUserID: number) => void): boolean;

    /**
     * Set callback function of notification of users who leave the meeting.
     * @method SetMeetingUserLeftCB
     * @param {Function} meetinguserleftcb
     * @return {Boolean}
     */
    SetMeetingUserLeftCB(meetinguserleftcb: (lstUserID: number) => void): boolean;

    /**
    * Set callback function of notification of the new host.
    * @method SetMeetingHostChangeCB
    * @param {Function} onHostChangeNotification
    * @return {Boolean}
    */
    SetMeetingHostChangeCB(onHostChangeNotification: (userId: number) => void): boolean;

    /**
     * Get the list of all the panelists in the meeting.
     * @method GetParticipantsList
     * @return {Array} If the function succeed, the return value is the list of the panelists in the meeting.
        Otherwise failed, the return value is NULL.
      */
    GetParticipantsList(): { userid: number }[];

    /**
     * Get the information of specified user.
     * @method GetUserInfoByUserID
     * @param {Number} userid Specify the user ID for which you want to get the information.
        Zero(0) indicates to get the information of the current user.
      * @return {Number} If the function succeed, the return value is an object which includes the user's infomation.
        Otherwise failed, the return value is an empty object.
      */
    GetUserInfoByUserID(userid: number): ZoomUserInfo;
  }

  export interface ZoomUserInfo {
    userName: string,
    isH323User: boolean,
    isHost: boolean,
    userID: number,
    isVideoOn: boolean,
    isAudioMuted: boolean,
    isMySelf: boolean,
    userRole: settings.UserRole,
    isPurePhoneUser: boolean,
    WebinarAtendeeStatus: boolean,
    userInfoType: settings.ZNSDKUserInfoType,
    customerKey: string,
    audioJoinType: number,
    isInWaitingRoom: boolean,
    isRaiseHand: boolean,
    audioVoiceLevel: string,
    isClosedCaptionSender: boolean
  }

  export interface ZoomMeetingAudio {
    /**
     * Set user's audio status changed callback function.
     * @method MeetingAudio_SetMeetingAudioStatusCB
     * @param {Function} onUserAudioStatusChange
     * @return {Boolean}
     */
    MeetingAudio_SetMeetingAudioStatusCB(onUserAudioStatusChange: (lstAudioStatusChange: string) => void): boolean;


    /**
     * Set the callback event that users whose audio is active changed.
     * @method MeetingAudio_SetUserActiveAudioChangeCB
     * @param {Function} onUserActiveAudioChange
     * @return {Boolean}
     */
    MeetingAudio_SetUserActiveAudioChangeCB(onUserActiveAudioChange: (lstActiveAudio: string) => void): boolean;

    /**
    * Mute the assigned user.
    * @method MeetingAudio_MuteAudio
    * @param {Number} userid Specify the user ID to mute. null indicates to mute all the participants.
    * @param {Boolean} allowunmutebyself The user may unmute himself when everyone is muted.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    MeetingAudio_MuteAudio(opts: {
      userid: number,
      allowunmutebyself: boolean,
    }): settings.ZoomSDKError;

    /**
    * Unmute the assigned user.
    * @method MeetingAudio_UnMuteAudio
    * @param {Number} userid Specify the user ID to unmute.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    MeetingAudio_UnMuteAudio(opts: {
      userid: number,
    }): settings.ZoomSDKError;

    /**
    * Join VoIP meeting.
    * @method MeetingAudio_JoinVoip
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    MeetingAudio_JoinVoip(): settings.ZoomSDKError;

    /**
    * Leave VoIP meeting.
    * @method MeetingAudio_LeaveVoip
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    MeetingAudio_LeaveVoip(): settings.ZoomSDKError;

    /**
    * User joins or leaves the meeting in silence or no.
    * @method MeetingAudio_EnablePlayChimeWhenEnterOrExit
    * @param {Boolean} bEnable TRUE indicates to play chime when the user joins or leaves the meeting.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    MeetingAudio_EnablePlayChimeWhenEnterOrExit(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;
  }

  export interface ZoomMeetingConfiguration {
    /**
         * Set the callback of upgrading the free meeting.
         * @method MeetingConfig_SetFreeMeetingNeedToUpgradeCB
         * @param {Function} onFreeMeetingNeedToUpgrade
         * @return {Boolean}
         */
    MeetingConfig_SetFreeMeetingNeedToUpgradeCB(onFreeMeetingNeedToUpgrade: (type: settings.FreeMeetingNeedUpgradeType, gift_url: string) => void): boolean;

    /**
         * Set the callback function of starting to upgrade the free meeting by the gift link.
         * @method MeetingConfig_SetFreeMeetingUpgradeToGiftFreeTrialStartCB
         * @param {Function} onFreeMeetingUpgradeToGiftFreeTrialStart
         * @return {Boolean}
         */
    MeetingConfig_SetFreeMeetingUpgradeToGiftFreeTrialStartCB(onFreeMeetingUpgradeToGiftFreeTrialStart: () => void): boolean;

    /**
         * Set the callback of ending upgrade the free meeting by the gift link.
         * @method MeetingConfig_SetFreeMeetingUpgradeToGiftFreeTrialStopCB
         * @param {Function} onFreeMeetingUpgradeToGiftFreeTrialStop
         * @return {Boolean}
         */
    MeetingConfig_SetFreeMeetingUpgradeToGiftFreeTrialStopCB(onFreeMeetingUpgradeToGiftFreeTrialStop: () => void): boolean;

    /**
         * Set the callback of free meting upgrades successfully.
         * @method MeetingConfig_SetFreeMeetingUpgradeToProMeetingCB
         * @param {Function} onFreeMeetingUpgradeToProMeeting
         * @return {Boolean}
         */
    MeetingConfig_SetFreeMeetingUpgradeToProMeetingCB(onFreeMeetingUpgradeToProMeeting: () => void): boolean;

    /**
         * Set Input Meeting Password And Screen Name Notification Callback
         * @method MeetingConfig_SetInputMeetingPasswordAndScreenNameNotificationCB
         * @param {Function} onInputMeetingPasswordAndScreenNameNotification
         * @return {Boolean}
         */
    MeetingConfig_SetInputMeetingPasswordAndScreenNameNotificationCB(onInputMeetingPasswordAndScreenNameNotification: () => void): boolean;

    /**
         * Set Air Play Instruction Wnd Notification Callback
         * @method MeetingConfig_SetAirPlayInstructionWndNotificationCB
         * @param {Function} onAirPlayInstructionWndNotification
         * @return {Boolean}
         */
    MeetingConfig_SetAirPlayInstructionWndNotificationCB(onAirPlayInstructionWndNotification: (bShow: boolean, airhostName: string) => void): boolean;

    /**
         * Set on Webinar Need Register Notification Callback
         * @method MeetingConfig_SetonWebinarNeedRegisterNotificationCB
         * @param {Function} onWebinarNeedRegisterNotification
         * @return {Boolean}
         */
    MeetingConfig_SetonWebinarNeedRegisterNotificationCB(onWebinarNeedRegisterNotification: () => void): boolean;

    /**
         * Set on End Other Meeting To Join Meeting Notification Callback
         * @method MeetingConfig_SetonEndOtherMeetingToJoinMeetingNotificationCB
         * @param {Function} onEndOtherMeetingToJoinMeetingNotification
         * @return {Boolean}
         */
    MeetingConfig_SetonEndOtherMeetingToJoinMeetingNotificationCB(onEndOtherMeetingToJoinMeetingNotification: () => void): boolean;

    /**
         * Set on Free Meeting Remain Time Callback
         * @method MeetingConfig_SetonFreeMeetingRemainTimeCB
         * @param {Function} onFreeMeetingRemainTime
         * @return {Boolean}
         */
    MeetingConfig_SetonFreeMeetingRemainTimeCB(onFreeMeetingRemainTime: (leftTime: string) => void): boolean;

    /**
         * Set on Free Meeting Remain Time Stop Count Down Callback
         * @method MeetingConfig_SetonFreeMeetingRemainTimeStopCountDownCB
         * @param {Function} onFreeMeetingRemainTimeStopCountDown
         * @return {Boolean}
         */
    MeetingConfig_SetonFreeMeetingRemainTimeStopCountDownCB(onFreeMeetingRemainTimeStopCountDown: () => void): boolean;

    /**
        * Set the visibility of the INVITE button in the panelist action bar during the meeting. Default value: TRUE.
        * The user will receive the IMeetingUIControllerEvent::onInviteBtnClicked() callback event when he clicks the INVITE button. If the callback event is not handled, the SDK will pop up a Zoom custom invitation dialog.
        * The user will receive the IMeetingUIControllerEvent::onZoomInviteDialogFailed() callback event if the dialog box is failed to display.
        * @method MeetingConfig_EnableInviteButtonOnMeetingUI
        * @param {Boolean} bEnable TRUE indicates to display the button. Otherwise not.
        * @return {Number} Defined in: {@link ZoomSDKError}
        */
    MeetingConfig_EnableInviteButtonOnMeetingUI(opts: {
      bEnable: boolean
    }): settings.ZoomSDKError;

    /**
       * Set the position of the floating video window when sharing.
       * The value shall be set before the sharing begins. If you set the value during the process of share, the function will not be valid until the next share.
       * @method MeetingConfig_SetFloatVideoPos
       * @param {String} left Specify the left position of the floating video window when sharing.
       * @param {String} top Specify the top position of the floating video window when sharing.
       * @param {String} hSelfWnd SelfWnd (require hexadecimal)
       * @param {String} hParent parent window handle (require hexadecimal)
       * @return {Number} Defined in: {@link ZoomSDKError}
       */
    MeetingConfig_SetFloatVideoPos(opts: {
      left: string,
      top: string,
      hSelfWnd?: string,
      hParent?: string,
    }): settings.ZoomSDKError;

    /**
        * Set the visibility of the toolbar at the bottom of the meeting window. Default value: TRUE.
        * @method MeetingConfig_SetBottomFloatToolbarWndVisibility
        * @param {Boolean} bShow TRUE means to enable the feature to display always the toolbar at the bottom. Otherwise not.
        * @return {Number} Defined in: {@link ZoomSDKError}
        */
    MeetingConfig_SetBottomFloatToolbarWndVisibility(opts: {
      bShow: boolean
    }): settings.ZoomSDKError;

    /**
        * Set the visibility of the sharing toolbar. Default value: TRUE.
        * This function works only before the meeting or the sharing starts.
        * @method MeetingConfig_SetSharingToolbarVisibility
        * @param {Boolean} bShow TRUE means to enable the display sharing toolbar. Otherwise not.
        * @return {Number} Defined in: {@link ZoomSDKError}
        */
    MeetingConfig_SetSharingToolbarVisibility(opts: {
      bShow: boolean
    }): settings.ZoomSDKError;

    /**
    * Set the shared device ID when sharing directly.
    * @method MeetingConfig_SetDirectShareMonitorID
    * @param {String} monitorID Specify the device ID to be shared.
    * @return {Number} Defined in: {@link ZoomSDKError}
    */
    MeetingConfig_SetDirectShareMonitorID(opts: {
      monitorID: string
    }): settings.ZoomSDKError;

    /**
     * Set the position of the primary view meeting window.
     * @method MeetingConfig_SetMeetingUIPos
     * @param {String} left Specify the left position of the primary view meeting window. The coordinates of the window are those of the screen.
     * @param {String} top Specify the top position of the primary view meeting window. The coordinates of the window are those of the screen.
     * @param {String} hSelfWnd (require hexadecimal)
     * @param {String} hParent (require hexadecimal)
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_SetMeetingUIPos(opts: {
      left: string,
      top: string,
      hSelfWnd?: string,
      hParent?: string,
    }): settings.ZoomSDKError;

    /**
    * Set the visibility of the dialog box of waiting for the host after joining the meeting. Only invalidate when the host is not in the meeting. Default: FALSE.
    * @method MeetingConfig_DisableWaitingForHostDialog
    * @param {Boolean} bDisable TRUE indicates to hide the dialog box. FALSE not.
    * @return {Number} Defined in: {@link ZoomSDKError}
    */
    MeetingConfig_DisableWaitingForHostDialog(opts: {
      bDisable: boolean,
    }): settings.ZoomSDKError;

    /**
      * Set the visibility of the dialog box if the password is wrong when join the meeting. Default: FALSE.
      * If it is disabled to display the dialog box of wrong password, the system will directly exit the state of trying to join the meeting.
      * @method MeetingConfig_DisablePopupMeetingWrongPSWDlg
      * @param {Boolean} bDisable TRUE indicates to hide the dialog box of wrong password.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
    MeetingConfig_DisablePopupMeetingWrongPSWDlg(opts: {
      bDisable: boolean,
    }): settings.ZoomSDKError;

    /**
    * Set if it is able to end automatically another ongoing meeting when joining a new meeting. Default: FALSE.
    * @method MeetingConfig_EnableAutoEndOtherMeetingWhenStartMeeting
    * @param {Boolean} bEnable TRUE indicates to end the other ongoing meetings. FALSE not.
    * @return {Number} Defined in: {@link ZoomSDKError}
    */
    MeetingConfig_EnableAutoEndOtherMeetingWhenStartMeeting(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to switch between the full screen mode and normal mode by double-click. Default value: TRUE.
     * @method MeetingConfig_EnableLButtonDBClick4SwitchFullScreenMode
     * @param {Boolean} bEnable TRUE indicates to switch. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableLButtonDBClick4SwitchFullScreenMode(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;


    /**
     * Set the visibility of the floating video window when sharing in the meeting. Default value: TRUE.
     * @method MeetingConfig_SetFloatVideoWndVisibility
     * @param {Boolean} bShow TRUE indicates to display the floating video window. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_SetFloatVideoWndVisibility(opts: {
      bShow: boolean,
    }): settings.ZoomSDKError;

    /**
     * Pre-set email and username information before joining the webinar.
     * @method MeetingConfig_PrePopulateWebinarRegistrationInfo
     * @param {String} email Configure the default email.
     * @param {String} userName Configure default username.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_PrePopulateWebinarRegistrationInfo(opts: {
      email: string,
      userName: string,
    }): settings.ZoomSDKError;

    /**
     * Reset the meeting configuration and back to the default state.
     * @method MeetingConfig_Reset
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_Reset(): settings.ZoomSDKError;

    /**
        * Set if it is able to auto-adjust the volume of the speaker when joining the meeting. Default: TRUE.
        * If it is SDKERR_SUCCESS, the SDK will adjust the speaker volume automatically. It will unmute if the speaker was muted.
        * @method MeetingConfig_EnableAutoAdjustSpeakerVolumeWhenJoinAudio
        * @param {Boolean} bEnable TRUE indicates to auto-adjust the volume of the speaker. FALSE not.
        * @return {Number} Defined in: {@link ZoomSDKError}
        */
    MeetingConfig_EnableAutoAdjustSpeakerVolumeWhenJoinAudio(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to auto-adjust the volume of the mic when joining the meeting. Default: TRUE.
     * If it is SDKERR_SUCCESS, the SDK will adjust the mic volume automatically. It will unmute if the mic was muted.
     * @method MeetingConfig_EnableAutoAdjustMicVolumeWhenJoinAudio
     * @param {Boolean} bEnable TRUE indicates to auto-adjust the volume of the mic. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableAutoAdjustMicVolumeWhenJoinAudio(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Configure DSCP(Differential services code point) values.
     * This interface satisfies some users who have other requirements. It is not recommended to configure it. Contact the support engineer for more details.
     * @method MeetingConfig_ConfigDSCP
     * @param {Number} dscpAudio Configure DSCP value for audio.
     * @param {Number} dscpVideo Configure DSCP value for video.
     * @param {Boolean} bReset Reset DSCP values. This param is just used for Windows. For Mac, you can pass TRUE or FALSE as you like
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_ConfigDSCP(opts: {
      dscpAudio: number,
      dscpVideo: number,
      bReset: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to limit the length of meeting ID. Default: FALSE.
     * If it is enabled, the length of the meeting ID depends on the ID type. The ID shall be more than nine(9) figures or five(5) letters.
      Also, The meeting ID will be displayed as it is (not formatted).
      * @method MeetingConfig_EnableLengthLimitationOfMeetingNumber
      * @param {Boolean} bEnable TRUE indicates to limit the length of meeting ID. FALSE not
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
    MeetingConfig_EnableLengthLimitationOfMeetingNumber(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to share IOS device. Default: FALSE.
     * @method MeetingConfig_EnableShareIOSDevice
     * @param {Boolean} bEnable TRUE indicates to enable to share. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableShareIOSDevice(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to share white board. Default: TRUE.
     * @method MeetingConfig_EnableShareWhiteBoard
     * @param {Boolean} bEnable TRUE indicates to enable to share on the white board. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableShareWhiteBoard(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;


    /**
     * Set whether to forbid multi-share. Default: FALSE.
     * @method MeetingConfig_ForceDisableMultiShare
     * @param {Boolean} bDisable TRUE indicates to forbid multi-share. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_ForceDisableMultiShare(opts: {
      bDisable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the maximum duration of the meeting when there is no attendee in the meeting. Default: 24*60
     * @method MeetingConfig_SetMaxDurationForOnlyHostInMeeting
     * @param {Number} nDuration Specify the maximum duration in minutes
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_SetMaxDurationForOnlyHostInMeeting(opts: {
      nDuration: number,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of the local recording convert progress bar dialog. Default: TRUE
     * @method MeetingConfig_EnableLocalRecordingConvertProgressBarDialog
     * @param {Boolean} bShow TRUE indicates to show the dialog box. FALSE not
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableLocalRecordingConvertProgressBarDialog(opts: {
      bShow: boolean,
    }): settings.ZoomSDKError;


    /**
     * Set the visibility of the dialog box when receiving the request of remote control during the meeting. Default value: TRUE.
     * @method MeetingConfig_EnableApproveRemoteControlDlg
     * @param {Boolean} bEnable TRUE indicates to display the dialog box. FALSE not.
        If it is FALSE, the user can deal with this request in the IMeetingRemoteCtrlEvent::onRemoteControlStatus() callback event sent by SDK when receiving the request of the remote control and then enters the sharing status at the end of callback event.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableApproveRemoteControlDlg(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;


    /**
     * Set the visibility of the dialog box when the request of the remote control is refused. Default value: TRUE.
     * @method MeetingConfig_EnableDeclineRemoteControlResponseDlg
     * @param {Boolean} bEnable TRUE indicates to display the dialog box. FALSE not.
        If it is FALSE, the user can deal with this request in the IMeetingRemoteCtrlEvent::onRemoteControlStatus() callback event sent by SDK when receiving the decline request of the remote control and then exists the sharing status at the end of callback event.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableDeclineRemoteControlResponseDlg(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of the LEAVE MEETING button on the pop-up dialogue box when the host leaves the meeting. Default value: TRUE.
     * @method MeetingConfig_EnableLeaveMeetingOptionForHost
     * @param {Boolean} bEnable TRUE indicates to display the button. Otherwise not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableLeaveMeetingOptionForHost(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of the Video button in the toolbar during the meeting. Default value: TRUE.
     * @method MeetingConfig_EnableVideoButtonOnMeetingUI
     * @param {Boolean} bEnable TRUE indicates to display the button. Otherwise not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableVideoButtonOnMeetingUI(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Enable Set the visibility of the buttons to enter or exit the full screen in the meeting window. Default value: TRUE.
     * @method MeetingConfig_EnableEnterAndExitFullScreenButtonOnMeetingUI
     * @param {Boolean} bEnable TRUE indicates to display the button. Otherwise not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableEnterAndExitFullScreenButtonOnMeetingUI(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to handle the event with user's own program by clicking START SHARE button in the meeting. Default value: FALSE.
     * The SDK won't enable the share if the user calls this function and sets to convert. The user will deal with the subsequent logic after receiving the onStartShareBtnClicked() callback event.
     * @method MeetingConfig_RedirectClickShareBTNEvent
     * @param {Boolean} bEnable TRUE indicates to deal with the event with user's own program. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_RedirectClickShareBTNEvent(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to handle the event with user's own program by clicking END MEETING button in the meeting. Default value: FALSE.
     * The SDK won't end the meeting if the user calls this function and set to convert. The user will deal with the subsequent logic after receiving the onEndMeetingBtnClicked() callback event.
     * @method MeetingConfig_RedirectClickEndMeetingBTNEvent
     * @param {Boolean} bEnable TRUE indicates to handle with user's own program. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_RedirectClickEndMeetingBTNEvent(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * An upgrade dialog box will pop up when the free meeting is over. Use this function to set if it is able to handle the reminder message with user's own program. Default value: FALSE.
     * @method MeetingConfig_RedirectFreeMeetingEndingReminderDlg
     * @param {Boolean} bEnable TRUE indicates to handle the reminder message with user's own program. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_RedirectFreeMeetingEndingReminderDlg(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to handle the event with SDK user's own program by clicking CUSTOM LIVE STREAM button in the meeting. Default value: FALSE.
     * If the user calls this function to convert, the SDK will trigger the onCustomLiveStreamMenuClicked() instead of jumping to the live video page when clicking on the custom live stream, then deal with the subsequent logic.
     * @method MeetingConfig_RedirectClickCustomLiveStreamMenuEvent
     * @param {Boolean} bEnable TRUE indicates to handle with user's own program. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_RedirectClickCustomLiveStreamMenuEvent(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to handle the event with SDK user's own program by clicking PARTICIPANT LIST button in the meeting. Default value: FALSE.
     * The list won't unfold by clicking participant list button if the user calls this function to set to convert. The SDK will trigger the onParticipantListBtnClicked(), and the user shall deal with the subsequent logic himself.
     * @method MeetingConfig_RedirectClickParticipantListBTNEvent
     * @param {Boolean} bEnable TRUE indicates to handle with user's own program. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_RedirectClickParticipantListBTNEvent(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to handle the event with SDK user's own program by clicking Closed Caption button in the meeting. Default value: FALSE.
     * If the user calls this function to convert, the SDK will trigger the onCCBTNClicked(), and the user shall deal with the subsequent logic himself.
     * @method MeetingConfig_RedirectClickCCBTNEvent
     * @param {Boolean} bEnable TRUE indicates to handle with user's own program. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_RedirectClickCCBTNEvent(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to handle the warning message with SDK user's own program in the meeting. Default value: None.
     * @method MeetingConfig_RedirectMeetingWarningMsg
     * @param {Boolean} bRedirectBadNetwork
     * @param {Boolean} bRedirectWarnHighCPU
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_RedirectMeetingWarningMsg(opts: {
      bRedirectBadNetwork: boolean,
      bRedirectWarnHighCPU: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to temporarily show tooltip of the button in the toolbar of the meeting and user can close it by click the "x". Default value: TRUE.
     * @method MeetingConfig_EnableToolTipsShow
     * @param {Boolean} bEnable TRUE indicates to enable to show the tooltip in the meeting. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableToolTipsShow(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to retrieve the permission of host (when the original host gives up the host permission). Default value: TRUE.
     * The original host can always claim host and is not affected by this API.
     * @method MeetingConfig_EnableClaimHostFeature
     * @param {Boolean} bEnable TRUE indicates that he can retrieve the permission of host. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableClaimHostFeature(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of the dialog box of choosing audio when joining the meeting. Default value: FALSE.
     * @method MeetingConfig_EnableAutoHideJoinAudioDialog
     * @param {Boolean} bEnable TRUE indicates to hide the dialog box of choosing audio when joining the meeting. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableAutoHideJoinAudioDialog(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to display the preview window of the Meeting Controls on the task bar during sharing. Default value: FALSE.
     * @method MeetingConfig_AlwaysShowIconOnTaskBar
     * @param {Boolean} bEnable TRUE indicates to display always the icon on the task-bar.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_AlwaysShowIconOnTaskBar(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to enable split screen during the meeting. Default value: FALSE.
     * @method MeetingConfig_DisableSplitScreenModeUIElements
     * @param {Boolean} bEnable TRUE indicates to disable the split screen. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_DisableSplitScreenModeUIElements(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of the SHARE COMPUTER SOUND check-box in the sharing window. Default value: TRUE.
     * @method MeetingConfig_SetShowAudioUseComputerSoundChkbox
     * @param {Boolean} bEnable TRUE indicates to display. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_SetShowAudioUseComputerSoundChkbox(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of PHONE CALL tab in the audio dialog box when joining the meeting. Default value: TRUE.
     * @method MeetingConfig_SetShowCallInTab
     * @param {Boolean} bEnable TRUE indicates to display the tab. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_SetShowCallInTab(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of CALL ME tab in the audio dialog box when joining the meeting. Default value: TRUE.
     * @method MeetingConfig_SetShowCallMeTab
     * @param {Boolean} bEnable TRUE indicates to display the tab. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_SetShowCallMeTab(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Whether to remove the topmost attribute of setting dialog. Default is not removed.
     * @method MeetingConfig_DisableTopMostAttr4SettingDialog
     * @param {Boolean} bEnable TRUE indicates to remove. FALSE not.
     * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_DisableTopMostAttr4SettingDialog(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set whether to close the current sharing of another user without prompt and directly beginning a new sharing content by the closer. Default value: FALSE(prompt).
     * @method MeetingConfig_EnableGrabShareWithoutReminder
     * @param {Boolean} bEnable TRUE indicates no prompt. FALSE not.
     * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableGrabShareWithoutReminder(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of the SWITCH TO SINGLE PARTICIPANT SHARE dialog box when multiple participants are sharing and the user try to change the setting to single share. Default: TURE.
     * @method MeetingConfig_EnableShowShareSwitchMultiToSingleConfirmDlg
     * @param {Boolean} bEnable TRUE indicates to show dialog box if the multishare option is changed. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableShowShareSwitchMultiToSingleConfirmDlg(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of the REMAINING MEETING TIME button in the meeting. Default: FALSE.
     * If the button is disabled to show, you will retrieve onFreeMeetingRemainTime callback event.
     * @method MeetingConfig_DisableFreeMeetingRemainTimeNotify
     * @param {Boolean} bEnable TRUE indicates to hide the button when the free meeting need be reminded. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_DisableFreeMeetingRemainTimeNotify(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set whether to display the button CHAT and menu item. Default is displaying.
     * @method MeetingConfig_HideChatItemOnMeetingUI
     * @param {Boolean} bEnable TRUE means hiding, otherwise not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_HideChatItemOnMeetingUI(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set whether to display the button RECORD and menu item. Default is displaying.
     * @method MeetingConfig_HideRecordItemOnMeetingUI
     * @param {Boolean} bEnable TRUE means hiding, otherwise not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_HideRecordItemOnMeetingUI(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;


    /**
     * Set whether to display the button UPGRADE when prompt the tooltip of free meeting counts down. Default is displaying.
     * @method MeetingConfig_HideUpgradeFreeMeetingButton
     * @param {Boolean} bEnable TRUE means hiding, otherwise not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_HideUpgradeFreeMeetingButton(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of some specified tabs in the invite dialog. Default: Show all the content.
     * @method MeetingConfig_SetShowInviteDlgTabPage
     * @param {Number} tabPage Specify a tab page, Defined in: {@link SDKInviteDlgTabPage}
     * @param {Boolean} bShow TRUE indicates to display the tab. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_SetShowInviteDlgTabPage(opts: {
      tabPage: number,
      bShow: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of some specified tabs in the Room System invitation dialog. Default: show all the content.Default: show all the content.
     * @method MeetingConfig_SetShowH323SubTabPage
     * @param {Number} tabPage Specify a tab, Defined in: {@link SDKH323TabPage}
     * @param {Boolean} bShow TRUE indicates to display the tab. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_SetShowH323SubTabPage(opts: {
      tabPage: number,
      bShow: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of Switch Camera button on 2nd camera share window,Default: TRUE.
     * @method MeetingConfig_HideSwitchCameraButton
     * @param {Boolean} bEnable TRUE indicates to hide the Switch Camera button. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_HideSwitchCameraButton(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of CopyURL button on invite window, Default: TRUE.
     * @method MeetingConfig_HideCopyUrlOnInviteWindow
     * @param {Boolean} bEnable TRUE indicates to hide, FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_HideCopyUrlOnInviteWindow(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of CopyInvitation button on invite window, Default: TRUE.
     * @method MeetingConfig_HideCopyInvitationOnInviteWindow
     * @param {Boolean} bEnable TRUE indicates to hide, FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_HideCopyInvitationOnInviteWindow(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;


    /**
     * Set the visibility of Keypad button on meeting window, Default: TRUE.
     * @method MeetingConfig_HideKeypadButtonOnMeetingWindow
     * @param {Boolean} bEnable TRUE indicates to hide, FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_HideKeypadButtonOnMeetingWindow(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set whether to display the button REMOTE CONTROL and menu item. Default is displaying.
     * If the calling of API with parameter TRUE is successful, SDK will call EnableApproveRemoteControlDlg(false) by default.
     * @method MeetingConfig_HideRemoteControlOnMeetingUI
     * @param {Boolean} bEnable TRUE means hiding, otherwise not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_HideRemoteControlOnMeetingUI(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of Q&A on meeting UI. Default is displaying.
     * @method MeetingConfig_HideQAOnMeetingUI
     * @param {Boolean} bEnable TRUE means hiding, otherwise not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_HideQAOnMeetingUI(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of poll on meeting UI. Default is displaying.
     * @method MeetingConfig_HidePollOnMeetingUI
     * @param {Boolean} bEnable TRUE means hiding, otherwise not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_HidePollOnMeetingUI(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;


    /**
     * Set the visibility of the dialog box to input the password. Default: TRUE.
     * If it is disabled, the SDK will trigger onInputMeetingPasswordAndScreenNameNotification()callback event when the user is asked to re-enter the password, then the user shall deal with the subsequent logic.
     * @method MeetingConfig_EnableInputMeetingPasswordDlg
     * @param {Boolean} bEnable TRUE indicates to display the dialog box to input password. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableInputMeetingPasswordDlg(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;


    /**
     * Set the visibility of the dialog box to input the screen name. Default: TRUE.
     * If it is false, the SDK will trigger IMeetingConfigurationEvent::onInputMeetingPasswordAndScreenNameNotification()callback event when the user is asked to re-enter the screen name, then the user shall deal with the subsequent logic.
     * @method MeetingConfig_EnableInputMeetingScreenNameDlg
     * @param {Boolean} bEnable TRUE indicates to display the dialog box to input the screen name which is to be displayed in the meeting. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableInputMeetingScreenNameDlg(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;


    /**
     * Set if it is able to handle the webinar register process with user's own program in the meeting. Default: FALSE.
     * If it is true, the SDK will trigger the IMeetingConfigurationEvent::onWebinarNeedRegisterNotification()callback event.
     * @method MeetingConfig_RedirectWebinarNeedRegister
     * @param {Boolean} bEnable TRUE indicates to redirect. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_RedirectWebinarNeedRegister(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;


    /**
     * Set if it is able to redirect the process to end another meeting by user's own program. Default: FALSE.
     * This function doesn't work if the IJoinMeetingBehaviorConfiguration::EnableAutoEndOtherMeetingWhenStartMeeting(true) is also called. If redirect successfully, the SDK will trigger the IMeetingConfigurationEvent::onEndOtherMeetingToJoinMeetingNotification() callback event.
     * @method MeetingConfig_RedirectEndOtherMeeting
     * @param {Boolean} bEnable TRUE indicates to redirect. FALSE not. If it is TRUE, the SDK will trigger the onEndOtherMeetingToJoinMeetingNotification().
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_RedirectEndOtherMeeting(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;


    /**
     * Force to enable the video when join meeting.
     * The default behavior depends on the configuration of the meeting.
     * @method MeetingConfig_EnableForceAutoStartMyVideoWhenJoinMeeting
     * @param {Boolean} bEnable TRUE indicates to force to start video.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableForceAutoStartMyVideoWhenJoinMeeting(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;


    /**
     * Force to turn off video when joining the meeting.
     * The default behavior depends on the configuration of the meeting.
     * @method MeetingConfig_EnableForceAutoStopMyVideoWhenJoinMeeting
     * @param {Boolean} bEnable TRUE indicates to force to turn off the video.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableForceAutoStopMyVideoWhenJoinMeeting(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of the dialog  SELECT JOIN AUDIO when joining meeting. Default: FALSE.
     * @method MeetingConfig_DisableAutoShowSelectJoinAudioDlgWhenJoinMeeting
     * @param {Boolean} bEnable TRUE indicates to hide the dialog box.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_DisableAutoShowSelectJoinAudioDlgWhenJoinMeeting(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;


    /**
     * Set the visibility of the OPTIMIZE FOR FULL SCREEN VIDEO CLIP check-box in the sharing window. Default value: TRUE.
     * @method MeetingConfig_SetShowVideoOptimizeChkbox
     * @param {Boolean} bShow TRUE indicates to display. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_SetShowVideoOptimizeChkbox(opts: {
      bShow: boolean,
    }): settings.ZoomSDKError;

    /**
     * Get the type of required information to be completed.
     * @method MeetingConfig_GetRequiredInfoType
     * @return {Number} If the function succeed, the return is defined in: {@link RequiredInfoType}
     */
    MeetingConfig_GetRequiredInfoType(): settings.RequiredInfoType;


    /**
     * Complete the password and screen name information.
     * The SDK will destroy the object instance after calling this function. Supplement with the correct information.
     * @method MeetingConfig_InputMeetingPasswordAndScreenName
     * @param {String} meeting_Password
     * @param {String} screenName
     * @return {Boolean}
     */
    MeetingConfig_InputMeetingPasswordAndScreenName(opts: {
      meeting_Password: string,
      screenName: string,
    }): boolean;

    /**
     * Complete the meeting id and screen name information.
     * The SDK will destroy the object instance after calling this function. Supplement with the correct information.
     * @method MeetingConfig_InputMeetingIDAndScreenName
     * @param {String} meetingID
     * @param {String} screenName
     * @return {Boolean}
     */
    MeetingConfig_InputMeetingIDAndScreenName(opts: {
      meetingID: string,
      screenName: string,
    }): boolean;

    /**
     * Complete the screen name.
     * The SDK will destroy this object instance after calling this function. Complete the information by the correct function.
     * @method MeetingConfig_InputMeetingScreenName
     * @param {String} screenName
     * @return {Boolean}
     */
    MeetingConfig_InputMeetingScreenName(opts: {
      screenName: string,
    }): boolean;

    /**
     * Meeting Password And Screen Name Handler Cancel
     * @method MeetingConfig_MeetingPasswordAndScreenNameHandler_Cancel
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_MeetingPasswordAndScreenNameHandler_Cancel(): settings.ZoomSDKError;


    /**
     * Get the type to register.
     * @method MeetingConfig_GetWebinarNeedRegisterType
     * @return {Number} Defined in: {@link WebinarNeedRegisterType}
     */
    MeetingConfig_GetWebinarNeedRegisterType(): settings.WebinarNeedRegisterType;


    /**
     * Get the URL to register webinar.
     * @method MeetingConfig_GetWebinarRegisterUrl
     * @return {String} If the function succeed, the return value is an URL.
     */
    MeetingConfig_GetWebinarRegisterUrl(): string;


    /**
     * Release Register Webinar By Url
     * @method MeetingConfig_ReleaseRegisterWebinarByUrl
     * @return {Number}
     */
    MeetingConfig_ReleaseRegisterWebinarByUrl(): settings.ZoomSDKError;


    /**
     * Configure the information of email and screen name.
     * The SDK will destroy this object instance after calling this function. Supplement with the correct information.
     * @method MeetingConfig_InputWebinarRegisterEmailAndScreenName
     * @param {String} email
     * @param {String} screenName
     * @return {Number}
     */
    MeetingConfig_InputWebinarRegisterEmailAndScreenName(opts: {
      email: string,
      screenName: string,
    }): settings.ZoomSDKError;

    /**
     * Cancel Register Webinar By Email
     * @method MeetingConfig_CancelRegisterWebinarByEmail
     * @return {Number}
     */
    MeetingConfig_CancelRegisterWebinarByEmail(): settings.ZoomSDKError;


    /**
     * Set if it is able to handle the event with SDK user's own program by clicking Audio button in the meeting. Default value: FALSE.
     * If the user calls this function to convert, the SDK will trigger the onAudioBtnClicked(AudioBtnClickedCallbackInfo info), and the user shall deal with the subsequent logic himself.
     * @method MeetingConfig_RedirectClickAudioBTNEvent
     * @param {Boolean} bRedirect TRUE indicates to handle with user's own program. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_RedirectClickAudioBTNEvent(opts: {
      bRedirect: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set if it is able to handle the event with SDK user's own program by clicking Audio Menu button in the meeting. Default value: FALSE.
     * If the user calls this function to convert, the SDK will trigger the onAudioMenuBtnClicked(), and the user shall deal with the subsequent logic himself.
     * @method MeetingConfig_RedirectClickAudioMenuBTNEvent
     * @param {Boolean} bRedirect TRUE indicates to handle with user's own program. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_RedirectClickAudioMenuBTNEvent(opts: {
      bRedirect: boolean,
    }): settings.ZoomSDKError;


    /**
     * Set the visibility of the Audio button in the toolbar during the meeting. Default value: TRUE.
     * @method MeetingConfig_EnableAudioButtonOnMeetingUI
     * @param {Boolean} bEnable TRUE indicates to display the button. Otherwise not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_EnableAudioButtonOnMeetingUI(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of the dialog box of joining a meeting. Default: FALSE.
     * @method MeetingConfig_DisableShowJoinMeetingWnd
     * @param {Boolean} bDisable TRUE indicates to hide the dialog box. FALSE not.
     * @return {Number} Defined in: {@link ZoomSDKError}
     */
    MeetingConfig_DisableShowJoinMeetingWnd(opts: {
      bDisable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Disable Toolbar Invite Button Click Origin Action, only support for MAC platform
     * @method MeetingConfig_DisableToolbarInviteButtonClickOriginAction
     * @param {Boolean} bDisable
     * @return {Number}
     */
    MeetingConfig_DisableToolbarInviteButtonClickOriginAction(opts: {
      bDisable: boolean,
    }): settings.ZoomSDKError;


    /**
     * Set whether to forbid confidential watermark. Default: FALSE.
     * @method MeetingConfig_DisableConfidentialWatermark
     * @param {Boolean} bDisable TRUE indicates to forbid confidential watermark. FALSE not.
     * @return {Boolean} If watermark confidential is forbidden, the return value is TRUE. Otherwise FALSE.
     */
    MeetingConfig_DisableConfidentialWatermark(opts: {
      bDisable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set the visibility of the INVITE link during the meeting. Default value: TRUE.
     * @method MeetingConfig_EnableInviteLinkOnMeetingUI
     * @param {Boolean} bEnable TRUE indicates to display the link. Otherwise not.
     * @return {Boolean}
     */
    MeetingConfig_EnableInviteLinkOnMeetingUI(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;
  }

  export interface ZoomMeetingShare {
    /**
      * Set callback function of notification of the changed sharing status.
      * @method MeetingShare_SetOnSharingStatusCB
      * @param {Function} onSharingStatus
      * @return {Boolean}
      */
    MeetingShare_SetOnSharingStatusCB(onSharingStatus: (info: {ShareStatus: settings.ZNShareStatus, userId: number}) => void): boolean;

    /**
      * Share the specified application.
      * @method MeetingShare_StartAppShare
      * @param {String} zn_hShare_app (require hexadecimal) Specify the window handle of the application to be shared. If the hwndSharedApp can't be shared, the return value is the SDKERR_INVALID_PARAMETER error code. If the hwndSharedApp is NULL, the primary monitor will be shared.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingShare_StartAppShare(opts: { zn_hShare_app: string }): settings.ZoomSDKError;

    /**
      * Share the specified monitor.
      * @method MeetingShare_StartMonitorShare
      * @param {String} zn_monitorID Specify the monitor ID to be shared. You may get the value via EnumDisplayMonitors System API. If the monitorID is NULL, the primary monitor will be shared
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingShare_StartMonitorShare(opts: { zn_monitorID: string }): settings.ZoomSDKError;

    /**
      * Stop the current sharing.
      * @method MeetingShare_StopShare
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingShare_StopShare(): settings.ZoomSDKError;

    /**
      * Determine whether the legal notice for white board is available.
      * @method MeetingShare_IsWhiteboardLegalNoticeAvailable
      * @return {Boolean} True indicates the legal notice for white board is available. Otherwise False.
      */
    MeetingShare_IsWhiteboardLegalNoticeAvailable(): boolean;

    /**
      * Get the white board legal notices prompt.
      * @method MeetingShare_GetWhiteboardLegalNoticesPrompt
      * @return {String}
      */
    MeetingShare_GetWhiteboardLegalNoticesPrompt(): string;

    /**
     * Get the white board legal notices explained.
     * @method MeetingShare_GetWhiteboardLegalNoticesExplained
     * @return {String}
     */
    MeetingShare_GetWhiteboardLegalNoticesExplained(): string;

    /**
     * Set to enable or disable the audio before sharing.
     * @method MeetingConfig_EnableInviteLinkOnMeetingUI
     * @param {Boolean} bEnable TRUE indicates to enable. FALSE not.
     * @return {Boolean}
     */
    MeetingShare_EnableShareComputerSound(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;
    
    /**
     * Set to enable or disable the audio while sharing.
     * @method MeetingConfig_EnableInviteLinkOnMeetingUI
     * @param {Boolean} bEnable TRUE indicates to enable. FALSE not.
     * @return {Boolean}
     */
     MeetingShare_EnableShareComputerSoundWhenSharing(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;

    /**
     * Set to enable the video optimization before sharing.
     * @method MeetingConfig_EnableInviteLinkOnMeetingUI
     * @param {Boolean} bEnable TRUE indicates to enable. FALSE not.
     * @return {Boolean}
     */
    MeetingShare_EnableOptimizeForFullScreenVideoClip(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;
    
    /**
     * Set to enable the video optimization when sharing.
     * @method MeetingConfig_EnableInviteLinkOnMeetingUI
     * @param {Boolean} bEnable TRUE indicates to enable. FALSE not.
     * @return {Boolean}
     */
     MeetingShare_EnableOptimizeForFullScreenVideoClipWhenSharing(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;
  }

  export interface ZoomMeetingUICtrl {
    /**
      * Set on invite button clicked callback function.
      * @method MeetingUI_SetInviteButtonClickedCB
      * @param {Function} onInviteBtnClicked
      * @return {Boolean}
      */
    MeetingUI_SetInviteButtonClickedCB(onInviteBtnClicked: () => void): boolean;

    /**
      * Determine if the user can swap to show sharing screen or video now.
      * @method MeetingUI_SetonStartShareBtnClickedCB
      * @param {Function} onStartShareBtnClicked
      * @return {Boolean}
      */
    MeetingUI_SetonStartShareBtnClickedCB(onStartShareBtnClicked: () => void): boolean;

    /**
      * Set on End Meeting Btn Clicked Callback
      * @method MeetingUI_SetonEndMeetingBtnClickedCB
      * @param {Function} onEndMeetingBtnClicked
      * @return {Boolean}
      */
    MeetingUI_SetonEndMeetingBtnClickedCB(onEndMeetingBtnClicked: () => void): boolean;

    /**
      * Set on Participant List Btn Clicked Callback
      * @method MeetingUI_SetonParticipantListBtnClickedCB
      * @param {Function} onParticipantListBtnClicked
      * @return {Boolean}
      */
    MeetingUI_SetonParticipantListBtnClickedCB(onParticipantListBtnClicked: () => void): boolean;

    /**
      * Set on Custom Live Stream Menu Clicked Callback
      * @method MeetingUI_SetonCustomLiveStreamMenuClickedCB
      * @param {Function} onCustomLiveStreamMenuClicked
      * @return {Boolean}
      */
    MeetingUI_SetonCustomLiveStreamMenuClickedCB(onCustomLiveStreamMenuClicked: () => void): boolean;

    /**
      * Set on Zoom Invite Dialog Failed Callback
      * @method MeetingUI_SetonZoomInviteDialogFailedCB
      * @param {Function} onZoomInviteDialogFailed
      * @return {Boolean}
      */
    MeetingUI_SetonZoomInviteDialogFailedCB(onZoomInviteDialogFailed: () => void): boolean;

    /**
      * Set on CCBTN Clicked Callback
      * @method MeetingUI_SetonCCBTNClickedCB
      * @param {Function} onCCBTNClicked
      * @return {Boolean}
      */
    MeetingUI_SetonCCBTNClickedCB(onCCBTNClicked: () => void): boolean;

    /**
      * Set on Audio BTN Clicked Callback
      * @method MeetingUI_SetonAudioBTNClickedCB
      * @param {Function} onAudioBtnClicked
      * @return {Boolean}
      */
    MeetingUI_SetonAudioBTNClickedCB(onAudioBtnClicked: () => void): boolean;

    /**
      * Set on Audio BTN Clicked Callback
      * @method MeetingUI_SetonAudioMenuBTNClickedCB
      * @param {Function} onAudioMenuBtnClicked
      * @return {Boolean}
      */
    MeetingUI_SetonAudioMenuBTNClickedCB(onAudioMenuBtnClicked: () => void): boolean;

    /**
      * Show the chat dialog during the meeting.
      * @method MeetingUI_ShowChatDlg
      * @param {String} hParent parent window handle (require hexadecimal)
      * @param {String} left chat window left pos
      * @param {String} top chat window top pos
      * @param {String} right chat window right pos
      * @param {String} bottom chat window bottom pos
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_ShowChatDlg(opts: {
      hParent: string,
      left: string,
      top: string,
      right: string,
      bottom: string,
    }): settings.ZoomSDKError;

    /**
      * Hide the chat dialog during the meeting.
      * @method MeetingUI_HideChatDlg
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_HideChatDlg(): settings.ZoomSDKError;

    /**
      * Enter full screen display mode.
      * @method MeetingUI_EnterFullScreen
      * @param {String} viewtype: view type of the meeting ui, Defined in: {@link ZoomMeetingUIViewType}
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_EnterFullScreen(opts?: {
      viewtype?: settings.ZoomMeetingUIViewType
    }): settings.ZoomSDKError;

    /**
      * Exit the full screen display mode.
      * @method MeetingUI_ExitFullScreen
      * @param {String} viewtype: view type of the meeting ui, Defined in: {@link ZoomMeetingUIViewType}
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_ExitFullScreen(opts?: {
      viewtype?: settings.ZoomMeetingUIViewType
    }): settings.ZoomSDKError;

    /**
      * Switch to video wall mode.
      * @method MeetingUI_SwitchToVideoWall
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_SwitchToVideoWall(): settings.ZoomSDKError;

    /**
      * Switch to the mode of showing the current speaker.
      * @method MeetingUI_SwtichToAcitveSpeaker
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_SwtichToAcitveSpeaker(): settings.ZoomSDKError;

    /**
      * Move the floating video window.
      * @method MeetingUI_MoveFloatVideoWnd
      * @param {String} left Sets the left margin edge for the floating video window. Please use the coordinate of the screen.
      * @param {String} top Sets the top margin edge for the floating video window. Please use the coordinate of the screen.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_MoveFloatVideoWnd(opts: {
      left: string,
      top: string,
    }): settings.ZoomSDKError;

    /**
      * Enable or disable to display the floating sharing toolbar.
      * This function works only in the share mode.
      * @method MeetingUI_ShowSharingToolbar
      * @param {Boolean} show TRUE indicates to display the floating toolbar.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_ShowSharingToolbar(opts: {
      show: boolean
    }): settings.ZoomSDKError;

    /**
      * Switch to current speaker mode on the floating window.
      * @method MeetingUI_SwitchFloatVideoToActiveSpkMod
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_SwitchFloatVideoToActiveSpkMod(): settings.ZoomSDKError;

    /**
      * Switch to gallery view mode on the floating window.
      * @method MeetingUI_SwitchFloatVideoToGalleryMod
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_SwitchFloatVideoToGalleryMod(): settings.ZoomSDKError;

    /**
      * Change float active speaker window type and size
      * @method MeetingUI_ChangeFloatoActiveSpkVideoSize
      * @param {String} floatvideotype the type of float active speaker window, {@link ZoomMeetingUIFloatVideoType}
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_ChangeFloatoActiveSpkVideoSize(opts: {
      floatvideotype: settings.ZoomMeetingUIFloatVideoType
    }): settings.ZoomSDKError;

    /**
      * Display/hide the window which is used to display the list of the participants.
      * @method MeetingUI_ShowParticipantsListWnd
      * @param {Boolean} show TRUE indicates to display the list of the participants.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_ShowParticipantsListWnd(opts: {
      show: boolean
    }): settings.ZoomSDKError;

    /**
      * Display/hide the toolbar at the bottom of the meeting window.
      * This function does not work if the user sets to hide the toolbar via SetBottomFloatToolbarWndVisibility().
      * @method MeetingUI_ShowBottomFloatToolbarWnd
      * @param {Boolean} show TRUE indicates to display the toolbar.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_ShowBottomFloatToolbarWnd(opts: {
      show: boolean
    }): settings.ZoomSDKError;

    /**
      * Display the dialog to choose the audio to join the meeting.
      * @method MeetingUI_ShowJoinAudioDlg
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_ShowJoinAudioDlg(): settings.ZoomSDKError;

    /**
      * Hide the dialog to choose the audio to join the meeting.
      * @method MeetingUI_HideJoinAudioDlg
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_HideJoinAudioDlg(): settings.ZoomSDKError;

    /**
      * Get the information in video wall mode.
      * @method MeetingUI_GetWallViewPageInfo
      * @param {String} currentPage
      * @param {String} totalPages
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_GetWallViewPageInfo(): settings.ZoomSDKError;

    /**
      * Show the video users on previous page or next page in video wall mode.
      * The function does not work if the window shows the first or last page. The return value is SDKERR_SUCCESS in this case.
      * @method MeetingUI_ShowPreOrNextPageVideo
      * @param {Boolean} show TRUE indicates to show the video users on previous page, FALSE next page.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_ShowPreOrNextPageVideo(opts: {
      show: boolean
    }): settings.ZoomSDKError;

    /**
      * Set the visibility of the green frame when sharing the desktop.
      * @method MeetingUI_ShowSharingFrameWindows
      * @param {Boolean} show TRUE indicates to display the frame. FALSE hide.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_ShowSharingFrameWindows(opts: {
      show: boolean
    }): settings.ZoomSDKError;

    /**
      * Get the information whether the current view supports split screen mode or not. If supports, check it if it is already in the split screen mode.
      * @method MeetingUI_GetCurrentSplitScreenModeInfo
      * @param {Boolean} bZNSupportSplitScreen
      * @param {Boolean} bZNInSplitScreenMode
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_GetCurrentSplitScreenModeInfo(): settings.ZoomSDKError;

    /**
      * Switch to the split screen mode or cancel.
      * TRUE does not work if it is in the split screen mode. FALSE does not work if it is not the split screen mode.
      * @method MeetingUI_SwitchSplitScreenMode
      * @param {Boolean} isSwitch TRUE indicates to switch to the split screen mode. FALSE cancel.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_SwitchSplitScreenMode(opts: {
      isSwitch: boolean
    }): settings.ZoomSDKError;

    /**
      * Active the principal window of meeting and place it on top.
      * @method MeetingUI_BackToMeeting
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          If the function fails, the return value is not SDKERR_SUCCESS. To get extended error information, refer to SDKError enum.
      */
    MeetingUI_BackToMeeting(): settings.ZoomSDKError;

    /**
        * Get the window handle of the meeting user interface. This interface is only valid on Windows
        * @method MeetingUI_GetMeetingUIWnd
        * @return {Number} If the function succeed, "hFirstView" the window handle(hex) of the meeting user interface displayed by the first view,
        * and "hSecondView" the window handle(hex) of the meeting user interface displayed by the second view
        */
    MeetingUI_GetMeetingUIWnd(): number;

    /**
      * Change the display mode of the minimized meeting window for the first view.
      * @method MeetingUI_SwitchMinimizeUIMode4FristScreenMeetingUIWnd
      * @param {Number} mode mode(number) Specifies the minimized mode. For more details, see {@link ZNSDKMinimizeUIMode}
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_SwitchMinimizeUIMode4FristScreenMeetingUIWnd(opts: {
      mode: settings.ZNSDKMinimizeUIMode
    }): settings.ZoomSDKError;

    /**
      * Determines the minimize state of the first view.
      * @method MeetingUI_IsMinimizeModeOfFristScreenMeetingUIWnd
      * @return {Number} If the function succeed, the return value is a object which includes "bIsMinimizMode", TRUE indicates the minimize state, FALSE not
      */
    MeetingUI_IsMinimizeModeOfFristScreenMeetingUIWnd(): { bIsMinimizMode: boolean };

    /**
      * when someone else shares, and meeting window is not full screen. you can call the api to switch video & share display postion
      * @method MeetingUI_SwapToShowShareViewOrVideo
      * @param {Boolean} mode 0 means to display share, otherwise video
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_SwapToShowShareViewOrVideo(opts: {
      mode: boolean
    }): settings.ZoomSDKError;

    /**
      * Determine if the meeting is displaying the sharing screen now.
      * @method MeetingUI_IsDisplayingShareViewOrVideo
      * @return {Number} 0 means is showing sharing screen, otherwise means is showing video
      */
    MeetingUI_IsDisplayingShareViewOrVideo(): number;

    /**
      * Determine if the user can swap to show sharing screen or video now.
      * @method MeetingUI_CanSwapToShowShareViewOrVideo
      * @return {Number} 0 means Can, otherwise not
      */
    MeetingUI_CanSwapToShowShareViewOrVideo(): number;

    /**
      * Set the meeting topic in the meeting information page. 
      * @method MeetingUI_SetMeetingTopic
      * @param {String} meetingTopic Specify the meeting topic in the meeting information page.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_SetMeetingTopic(opts: {
      meetingTopic: string
    }): settings.ZoomSDKError;

    /**
      * Set the cloud recording manage url in the recording setting page.
      * @method MeetingUI_SetCustomizedCloudRecordingMgrUrl
      * @param {String} crmURL Specify the cloud recording manage url in the recording setting page.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    MeetingUI_SetCustomizedCloudRecordingMgrUrl(opts: {
      crmURL: string
    }): settings.ZoomSDKError;

    /**
     * Set the customized invitation domain, this method can only be called after auth ready and before the join/start meeting.
     * @method MeetingUI_SetCustomizedInvitationDomain
     * @param {Boolean} invitationDomain specify the customized invitation domain. eg: abc.com, http://abc.com, https://abc.com.
     * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
         Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
     */
    MeetingUI_SetCustomizedInvitationDomain(opts: {
      invitationDomain: boolean
    }): settings.ZoomSDKError;
  }

  export interface ZoomMeetingInfo {
    /**
     * Get the current meeting number.
     * @method GetMeetingNumber
     * @return {Number} If the function succeed, the return value is the current meeting number. Otherwise returns ZERO(0).
     */
    GetMeetingNumber(): number;

    /**
     * Get the meeting topic.
     * @method GetMeetingTopic
     * @return {String} If the function succeed, the return value is the current meeting topic. Otherwise returns an empty string of length ZERO(0)
     */
    GetMeetingTopic(): string;

    /**
       * Get the current meeting ID.
       * @method GetMeetingID
       * @return {Number} If the function succeed, the return value is the current meeting ID. Otherwise returns an empty string of length ZERO(0).
       */
    GetMeetingID(): number | "";

    /**
      * Get the meeting type.
      * @method GetMeetingType
      * @return {Number} If the function succeed, the return value is the current meeting type. Defined in: {@link MeetingType} 
      */
    GetMeetingType(): settings.MeetingType;

    /** 
       * Get the email invitation template for the current meeting.
       * @method GetInviteEmailTeamplate
       * @return {String} If the function succeed, the return value is the email invitation template. Otherwise returns NULL.
       */
    GetInviteEmailTeamplate(): string | null;

    /** 
       * Get the meeting title in the email invitation template.
       * @method GetInviteEmailTitle
       * @return {String} If the function succeed, the return value is the meeting title. Otherwise returns NULL.
       */
    GetInviteEmailTitle(): string | null;

    /** 
       * Get the URL of invitation to join the meeting.
       * @method GetJoinMeetingUrl
       * @return {String} If the function succeed, the return value is the URL of invitation. Otherwise returns NULL.
       */
    GetJoinMeetingUrl(): string | null;

    /** 
      * Get the host tag of the current meeting.
      * @method GetMeetingHostTag
      * @return {String} If the function succeed, the return value is the host tag. Otherwise returns NULL.
      */
    GetMeetingHostTag(): string | null;

    /** 
      * Check if Internal Meeting
      * @method CheckingIsInternalMeeting
      * @return {Boolean}
      */
    CheckingIsInternalMeeting(): boolean;
  }

  export interface ZoomShareSetting {
    /**
     * Enable or disable to auto-fit the Zoom window when viewing the shared content.
     * @method Setting_EnableAutoFitToWindowWhenViewSharing
     * @param {Boolean} bEnable TRUE indicates to resize automatically.
     * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
     Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    Setting_EnableAutoFitToWindowWhenViewSharing(opts: { bEnable: boolean }): settings.ZoomSDKError;

    /**
       * Determine if it is able to auto-fit the Zoom window when viewing the shared content.
       * @method Setting_IsAutoFitToWindowWhenViewSharingEnabled
       * @return {Boolean} TRUE indicates to resize automatically.
       */
    Setting_IsAutoFitToWindowWhenViewSharingEnabled(): boolean;

    /**
      * Determine if the operating system supports the GPU acceleration when user shares.
      * @method Setting_IsCurrentOSSupportAccelerateGPUWhenShare
      * @return {Boolean} TRUE indicates support. FALSE not.
      */
    Setting_IsCurrentOSSupportAccelerateGPUWhenShare(): boolean;

    /**
      * Enable/Disable the GPU acceleration when user shares.
      * @method Setting_EnableAccelerateGPUWhenShare
      * @param {Boolean} bEnable TRUE indicates to enable the acceleration. FALSE not.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    Setting_EnableAccelerateGPUWhenShare(opts: { bEnable: boolean }): settings.ZoomSDKError;

    /**
      * Determine if GPU acceleration is enabled when user shares.
      * @method Setting_IsAccelerateGPUWhenShareEnabled
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    Setting_IsAccelerateGPUWhenShareEnabled(): settings.ZoomSDKError;

    /**
      * Enable/disable remote control of all applications.
      * @method Setting_EnableRemoteControlAllApplications
      * @param {Boolean} bEnable TRUE indicates to enable the remote control. FALSE not.
      * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
          Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
      */
    Setting_EnableRemoteControlAllApplications(opts: { bEnable: boolean }): settings.ZoomSDKError;

    /**
      * Determine if remote control of all applications is enabled.
      * @method Setting_IsRemoteControlAllApplicationsEnabled
      * @return {Boolean} TRUE indicates enabled. FALSE not.
      */
    Setting_IsRemoteControlAllApplicationsEnabled(): boolean;
  }

  export interface ZoomVideoSetting {

    /**
    * Set Computer Cam Device Changed Callback
    * @method Setting_SetComputerCamDeviceChangedCB
    * @param {Function} onComputerCamDeviceChanged
    * @return {Boolean}
    */
    Setting_SetComputerCamDeviceChangedCB(onComputerCamDeviceChanged: (newCameraList: ZoomDeviceInfo[]) => void): boolean;
    /**
    * Set Default Cam Device Changed Callback
    * @method Setting_SetDefaultCamDeviceChangedCB
    * @param {Function} onDefaultCamDeviceChanged
    * @return {Boolean}
    */
    Setting_SetDefaultCamDeviceChangedCB(onDefaultCamDeviceChanged: (deviceId: string, deviceName: string) => void): boolean;
    /** 
    * Select camera device.
    * @method Setting_SelectVideoCamera
    * @param {String} zn_deviceId Specify a device to be selected.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
    */
    Setting_SelectVideoCamera(opts: {
      zn_deviceId: string
    }): settings.ZoomSDKError;
    /** 
    * Get camera device list.
    * @method Setting_GetCameraList
    * @return {Array} If the function succeed, the return value the is camera device list. Otherwise failed, returns NULL.
    */
    Setting_GetCameraList(): ZoomDeviceInfo[];
    /** 
    * Enable or disable video mirror effect.
    * @method Setting_EnableVideoMirrorEffect
    * @param {Boolean} zn_bEnable TRUE indicates to enable the video mirror effect.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
    */
    Setting_EnableVideoMirrorEffect(opts: {
      zn_bEnable: boolean
    }): settings.ZoomSDKError;
    /** 
    * Enable or disable the video facial beauty effect.
    * @method Setting_EnableFaceBeautyEffect
    * @param {Boolean} zn_bEnable TRUE indicates to enable the video facial beauty effect.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
    */
    Setting_EnableFaceBeautyEffect(opts: {
      zn_bEnable: boolean
    }): settings.ZoomSDKError;
    /** 
    * Check if Video Mirror Effect Enabled
    * @method Checking_IsMirrorEffectEnabled
    * @return {Boolean}
    */
    Checking_IsMirrorEffectEnabled(): boolean;
    /** 
    * Get the flag to enable/disable the video facial beauty effect.
    * @method Checking_IsFaceBeautyEffectEnabled
    * @return {Boolean} Enabled or disabled.
    */
    Checking_IsFaceBeautyEffectEnabled(opts): boolean;
    /** 
    * Enable or disable HD video.
    * @method Setting_EnableHDVideo
    * @param {Boolean} bEnable TRUE indicates to enable the HD video.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
    */
    Setting_EnableHDVideo(opts: {
      bEnable: boolean
    }): settings.ZoomSDKError;
    /** 
    * Get the flag to enable/disable the HD video.
    * @method Setting_IsHDVideoEnabled
    * @return {Boolean} Enabled or disabled.
    */
    Setting_IsHDVideoEnabled(): boolean;
    /** 
    * Enable or disable to show the username on the video.
    * @method Setting_EnableAlwaysShowNameOnVideo
    * @param {Boolean} bEnable TRUE indicates to show the username on the video.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
    */
    Setting_EnableAlwaysShowNameOnVideo(opts: {
      bEnable: boolean
    }): settings.ZoomSDKError;
    /** 
    * Get the flag to enable/disable to show the username on video.
    * @method Setting_IsAlwaysShowNameOnVideoEnabled
    * @return {Boolean} Enabled or disabled.
    */
    Setting_IsAlwaysShowNameOnVideoEnabled(): boolean;
    /** 
    * Enable or disable to turn off the video when join meeting
    * @method Setting_EnableAutoTurnOffVideoWhenJoinMeeting
    * @param {Boolean} bEnable TRUE indicates to enable to turn off the video when join meeting
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
    */
    Setting_EnableAutoTurnOffVideoWhenJoinMeeting(opts: {
      bEnable: boolean
    }): settings.ZoomSDKError;
    /** 
    * Get the flag to enable to turn off the video when join meeting.
    * @method Setting_IsAutoTurnOffVideoWhenJoinMeetingEnabled
    * @return {Boolean} Enabled or disabled.
    */
    Setting_IsAutoTurnOffVideoWhenJoinMeetingEnabled(): boolean;
    /** 
    * Enable or disable the 16V9 video mode.
    * @method Setting_EnableAlwaysUse16v9
    * @param {Boolean} bEnable TRUE indicates to enable the 16V9 video mode.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
    */
    Setting_EnableAlwaysUse16v9(opts: {
      bEnable: boolean
    }): settings.ZoomSDKError;
    /** 
    * Get the flag to enable/disable the 16V9 video mode.
    * @method Setting_IsAlwaysUse16v9
    * @return {Boolean} Enabled or disabled.
    */
    Setting_IsAlwaysUse16v9(): boolean;
    /** 
    * Enable or disable to spotlight the video.
    * @method Setting_EnableSpotlightSelf
    * @param {Boolean} bEnable TRUE indicates to enable to spotlight the video.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
    */
    Setting_EnableSpotlightSelf(opts: {
      bEnable: boolean
    }): settings.ZoomSDKError;
    /** 
    * Get the flag to enable/disable to spotlight video.
    * @method Setting_IsSpotlightSelfEnabled
    * @return {Boolean} Enabled or disabled.
    */
    Setting_IsSpotlightSelfEnabled(): boolean;
    /** 
    * Enable or disable the hardware acceleration.
    * @method Setting_EnableHardwareEncode
    * @param {Boolean} bEnable TRUE indicates to enable the hardware acceleration.
    * @param {Number} encodeType Defined in: {@link ZoomSDKVideoHardwareEncodeType} 
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
    */
    Setting_EnableHardwareEncode(opts: {
      bEnable: boolean,
      encodeType: settings.ZoomSDKVideoHardwareEncodeType,
    }): settings.ZoomSDKError;
    /** 
    * Get the flag to enable/disable the hardware acceleration.
    * @method Setting_IsHardwareEncodeEnabled
    * @param {Number} encodeType Defined in: {@link ZoomSDKVideoHardwareEncodeType} 
    * @return {Boolean} Enabled or disabled.
    */
    Setting_IsHardwareEncodeEnabled(): boolean;
    /** 
    * Enable or disable to show the participants in Gallery View up to 49 per screen.
    * @method Setting_Enable49VideoesInGallaryView
    * @param {Boolean} bEnable TRUE indicates to show the participants in Gallery View up to 49 per screen.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
    */
    Setting_Enable49VideoesInGallaryView(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;
    /** 
    * Get the flag to enable/disable to show the participants in Gallery View up to 49 per screen.
    * @method Setting_Is49VideoesInGallaryViewEnabled
    * @return {Boolean} Enabled or disabled.
    */
    Setting_Is49VideoesInGallaryViewEnabled(): boolean;
    /** 
    * Enable or disable to hide the non-video participants.
    * @method Setting_EnableHideNoVideoUsersOnWallView
    * @param {Boolean} bEnable TRUE indicates to hide the non-video Participants.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
    */
    Setting_EnableHideNoVideoUsersOnWallView(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;
    /** 
    * Get the flag to enable/disable to hide non-video participants.
    * @method Setting_IsHideNoVideoUsersOnWallViewEnabled
    * @return {Boolean} Enabled or disabled.
    */
    Setting_IsHideNoVideoUsersOnWallViewEnabled(): boolean;
    /** 
    * Enable or disable to show the video preview dialog when join meeting
    * @method Setting_EnableVideoPreviewDialog
    * @param {Boolean} bEnable TRUE indicates to enable to show the video preview dialog when join meeting
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError} 
    */
    Setting_EnableVideoPreviewDialog(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;
    /** 
    * Get the flag to enable to show the video preview dialog when join meeting.
    * @method Setting_IsVideoPreviewDialogEnabled
    * @return {Boolean} Enabled or disabled.
    */
    Setting_IsVideoPreviewDialogEnabled(): boolean;
  }

  export interface ZoomAudioSetting {

    /**
    * Set Computer Mic Device Changed Callback
    * @method Setting_SetComputerMicDeviceChangedCB
    * @param {Function} onComputerMicDeviceChanged
    * @return {Boolean}
    */
    Setting_SetComputerMicDeviceChangedCB(onComputerMicDeviceChanged: (newMicList: ZoomDeviceInfo[]) => void): boolean;
    /**
    * Set Computer Speaker Device Changed Callback
    * @method Setting_SetComputerSpeakerDeviceChangedCB
    * @param {Function} onComputerSpeakerDeviceChanged
    * @return {Boolean}
    */
    Setting_SetComputerSpeakerDeviceChangedCB(onComputerSpeakerDeviceChanged: (newSpeakerList: ZoomDeviceInfo[]) => void): boolean;
    /**
    * Set Default Mic Device Changed Callback
    * @method Setting_SetDefaultMicDeviceChangedCB
    * @param {Function} onDefaultMicDeviceChanged
    * @return {Boolean}
    */
    Setting_SetDefaultMicDeviceChangedCB(onDefaultMicDeviceChanged: (deviceId: string, deviceName: string) => void): boolean;
    /**
    * Set Default Speaker Device Changed Callback
    * @method Setting_SetDefaultSpeakerDeviceChangedCB
    * @param {Function} onDefaultSpeakerDeviceChanged
    * @return {Boolean}
    */
    Setting_SetDefaultSpeakerDeviceChangedCB(onDefaultSpeakerDeviceChanged: (deviceId: string, deviceName: string) => void): boolean;

    /**
     * Select mic device.
     * @method Setting_SelectMic
     * @param {String} deviceId Specify the device to be selected.
     * @param {String} deviceName Specify the device name assigned by deviceId.
     * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
        Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
     */
    Setting_SelectMic(opts: {
      deviceId?: string,
      deviceName?: string,
    }): settings.ZoomSDKError;
    /**
    * Get the mic device list.
    * @method Setting_GetMicList
    * @return {Array} If the function succeed, the return value is the camera device list. Otherwise failed, returns NULL.
    */
    Setting_GetMicList(): ZoomDeviceInfo[];
    /**
    * Select speaker device.
    * @method Setting_SelectSpeaker
    * @param {String} deviceId Specify the device to be selected.
    * @param {String} deviceName Specify the device the device name assigned by deviceId.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    Setting_SelectSpeaker(opts: {
      deviceId?: string,
      deviceName?: string,
    }): settings.ZoomSDKError;
    /**
    * Get the speaker device list.
    * @method Setting_GetSpeakerList
    * @return {Array} If the function succeed, the return value is the camera device list. Otherwise failed, returns NULL.
    */
    Setting_GetSpeakerList(): ZoomDeviceInfo[];
    /**
    * Get the flag to enable/disable the audio automatically when join meeting.
    * @method Checking_IsAutoJoinAudioEnabled
    * @return {Boolean} Enabled or disabled.
    */
    Checking_IsAutoJoinAudioEnabled(): boolean;
    /**
    * Get the flag to enable/disable to auto-adjust the mic volume.
    * @method Checking_IsAutoAdjustMicEnabled
    * @return {Boolean} Enabled or disabled.
    */
    Checking_IsAutoAdjustMicEnabled(): boolean;
    /**
    * Enable or disable the audio automatically when join meeting.
    * @method Setting_EnableAutoJoinAudio
    * @param {Boolean} zn_bEnable TRUE indicates to enable the audio automatically when join meeting.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    Setting_EnableAutoJoinAudio(opts: {
      zn_bEnable: boolean
    }): settings.ZoomSDKError;
    /**
    * Enable or disable the auto-adjust mic volume.
    * @method Setting_EnableAutoAdjustMic
    * @param {Boolean} zn_bEnable TRUE indicates to enable to auto-adjust the mic volume.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    Setting_EnableAutoAdjustMic(opts: {
      zn_bEnable: boolean
    }): settings.ZoomSDKError;
    /**
    * Enable or disable the stereo audio.
    * This function is valid only if mic original input is enabled, otherwise invalid.
    * @method Setting_EnableStereoAudio
    * @param {Boolean} bEnable TRUE indicates to enable the stereo audio.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    Setting_EnableStereoAudio(opts: {
      bEnable: boolean
    }): settings.ZoomSDKError;
    /**
    * Get the flag to enable/disable the stereo audio.
    * @method Setting_IsStereoAudioEnable
    * @return {Boolean} Enabled or disabled.
    */
    Setting_IsStereoAudioEnable(): boolean;
    /**
    * Enable or disable the original input of mic.
    * @method Setting_EnableMicOriginalInput
    * @param {Boolean} bEnable TRUE indicates to enable the original input of mic.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    Setting_EnableMicOriginalInput(opts: {
      bEnable: boolean
    }): settings.ZoomSDKError;
    /**
    * Get the flag to enable/disable the original input of mic.
    * @method Setting_IsMicOriginalInputEnable
    * @return {Boolean} Enabled or disabled.
    */
    Setting_IsMicOriginalInputEnable(): boolean;
    /**
    * Enable or disable to press and hold the Space-bar to speak when muted.
    * @method Setting_EnableHoldSpaceKeyToSpeak
    * @param {Boolean} bEnable TRUE indicates to press and hold the Space-bar to speak.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    Setting_EnableHoldSpaceKeyToSpeak(opts: {
      bEnable: boolean
    }): settings.ZoomSDKError
    /**
    * Get the flag to enable/disable to press and hold the Space-bar to speak.
    * @method Setting_IsHoldSpaceKeyToSpeakEnabled
    * @return {Boolean} Enabled or disabled.
    */
    Setting_IsHoldSpaceKeyToSpeakEnabled(): boolean;
    /**
    * Enable or disable to mute always the mic when join the meeting by VoiP.
    * @method Setting_EnableAlwaysMuteMicWhenJoinVoip
    * @param {Boolean} bEnable TRUE indicates to enable to mute always the mic when join the meeting by VoiP.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    Setting_EnableAlwaysMuteMicWhenJoinVoip(opts: {
      bEnable: boolean
    }): settings.ZoomSDKError;
    /**
    * Get the flag to enable/disable to mute always the mic when join the meeting by VoiP.
    * @method Setting_IsAlwaysMuteMicWhenJoinVoipEnabled
    * @return {Boolean} Enabled or disabled.
    */
    Setting_IsAlwaysMuteMicWhenJoinVoipEnabled(): boolean;
    /**
    * Enable or disable to prompt when the user joins the meeting using the third party audio.
    * @method Setting_EnableSuppressAudioNotify
    * @param {Boolean} bEnable TRUE indicates to enable to prompt.
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    Setting_EnableSuppressAudioNotify(opts: {
      bEnable: boolean,
    }): settings.ZoomSDKError;
    /**
    * Get the flag to enable/disable to prompt when the user joins the meeting using the third party audio.
    * @method Setting_IsSuppressAudioNotifyEnabled
    * @return {Boolean} Enabled or disabled.
    */
    Setting_IsSuppressAudioNotifyEnabled(): boolean;
    /**
    * Set the echo cancellation level.
    * @method Setting_EnableEchoCancellation
    * @param {Number} level The new echo cancellation level to be set. {@link ZoomSDKEchoCancelLationLevel}
    * @return {Number} If the function succeed, the return value is SDKERR_SUCCESS.
      Otherwise failed. To get extended error information, Defined in: {@link ZoomSDKError}
    */
    Setting_SetEchoCancellationLevel(opts: {
      level: settings.ZoomSDKEchoCancelLationLevel,
    }): settings.ZoomSDKError
    /**
    * Get the echo cancellation level.
    * @method Setting_IsEchoCancellationEnabled
    * @return {Number} The the echo cancellation level. {@link ZoomSDKEchoCancelLationLevel}
    */
    Setting_GetEchoCancellationLevel(): number;
    /**
    * Set the volume of the selected mic.
    * @method Setting_SetMicVol
    * @param {Number} value Specify the volume of the mic that varies between 0 and 255.
    * @return {Number} The SDK will enable the default mic if there is no mic selected via SelectMic().
    */
    Setting_SetMicVol(opts: {
      value: number
    }): settings.ZoomSDKError;
    /**
    * Get the volume of the selected mic.
    * @method Setting_GetMicVol
    * @return {Number}
    */
    Setting_GetMicVol(): number;

    /**
    * Set the volume of the selected speaker.
    * @method Setting_SetSpeakerVol
    * @param {Number} value Specify the volume of the speaker that varies between 0 and 255.
    * @return {Number}
    */
    Setting_SetSpeakerVol(opts: {
      value: number
    }): settings.ZoomSDKError;
    /**
    * Get the volume of the selected speaker.
    * @method Setting_GetSpeakerVol
    * @return {Number}
    */
    Setting_GetSpeakerVol(): number;
  }

  export interface ZoomCustomizedResource {
    /**
      * Add the custom photo files, currently, support PNG and SVG formats. 
      * You must call the function first before calling InitSDK(), or no, it won't work.
      * @method Resource_AddCustomizedPictureResource
      * @param {String} strPNGID Resource ID corresponding to the custom resource.
      * @param {String} strPNGPath The location of the customized resource file must be an absolute path and include the file name with suffix.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
    Resource_AddCustomizedPictureResource(opts: { strPNGID: string, strPNGPath: string }): settings.ZoomSDKError;

    /**
      * Use the custom string to replace the specified string item.
      * If customizedString is NULL or is not NULL but with length zero(0), the return value is SDKERR_INVALID_PARAMETER.
        * You must call the function first before calling InitSDK(), or no, it won't work.
      * @method Resource_AddCustomizedStringResource
      * @param {String} CustomizedStringType Specify the string item type. Defined in: {@link SDKCustomizedStringType}
      * @param {String} strCustomizedString Specify the custom string.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
    Resource_AddCustomizedStringResource(opts: { CustomizedStringType: settings.SDKCustomizedStringType, strCustomizedString: string }): settings.ZoomSDKError;

    /**
      * Use the custom URL to replace the specified URL.
      * If customizedUrl is NULL or is not NULL but with length zero(0), the return value is SDKERR_INVALID_PARAMETER.
        * You must call the function first before calling InitSDK(), or no, it won't work.
      * @method Resource_AddCustomizedURLResource
      * @param {String} CustomizedURLType Specify the URL type. Defined in: {@link SDKCustomizedURLType}
      * @param {String} strCustomizeURL Specify the custom URL.
      * @return {Number} Defined in: {@link ZoomSDKError}
      */
    Resource_AddCustomizedURLResource(opts: { CustomizedURLType: settings.SDKCustomizedURLType, strCustomizeURL: string }): settings.ZoomSDKError;
  }

  export module zoom_sdk {
    export namespace ZoomSDK {
      export function getInstance(opts?: { path?: string }): ZoomSDK;
    }
  }

  export module settings {
    /**
     * @alias ZOOM_TYPE_OS_TYPE
     * @readonly
     * @enum {Number}
     */
    export enum ZOOM_TYPE_OS_TYPE {
      WIN_OS = 0,
      MAC_OS = 1,
    }

    /**
     * @alias ZoomSDK_LANGUAGE_ID
     * @readonly
     * @enum {Number}
     */
    export enum ZoomSDK_LANGUAGE_ID {
      LANGUAGE_Unknow = 0,
      LANGUAGE_English = 1,
      LANGUAGE_Chinese_Simplified = 2,
      LANGUAGE_Chinese_Traditional = 3,
      LANGUAGE_Japanese = 4,
      LANGUAGE_Spanish = 5,
      LANGUAGE_German = 6,
      LANGUAGE_French = 7,
      LANGUAGE_Portuguese = 8,
      LANGUAGE_Russian = 9,
      LANGUAGE_Korean = 10,
      LANGUAGE_Vietnamese = 11,
      LANGUAGE_Italian = 12,
    }

    /**
     * @alias ZoomSDKError
     * @readonly
     * @enum {Number}
     */
    export enum ZoomSDKError {
      /** 0, Success Result */
      SDKERR_SUCCESS = 0,
      /** 1, Not support this feature now */
      SDKERR_NO_IMPL = 1,
      /** 2, Wrong useage about this feature */
      SDKERR_WRONG_USEAGE = 2, //
      /** 3, Wrong parameter */
      SDKERR_INVALID_PARAMETER = 3,
      /** 4, Load module failed */
      SDKERR_MODULE_LOAD_FAILED = 4,
      /** 5, No memory allocated */
      SDKERR_MEMORY_FAILED = 5,
      /** 6, Internal service error */
      SDKERR_SERVICE_FAILED = 6,
      /** 7, Not initialize before use */
      SDKERR_UNINITIALIZE = 7,
      /** 8, Not Authentication before use */
      SDKERR_UNAUTHENTICATION = 8,
      /** 9, No recording in process */
      SDKERR_NORECORDINGINPROCESS = 9,
      /** 10, can't find transcoder module */
      SDKERR_TRANSCODER_NOFOUND = 10,
      /** 11, Video service not ready */
      SDKERR_VIDEO_NOTREADY = 11,
      /** 12, No premission to do this */
      SDKERR_NO_PERMISSION = 12,
      /** 13, Unknown error */
      SDKERR_UNKNOWN = 13,
      /** 14, The other instance of the SDK is in process. */
      SDKERR_OTHER_SDK_INSTANCE_RUNNING = 14,
      /** 15, SDK internal error. */
      SDKERR_INTELNAL_ERROR = 15,
      /** 16, No audio device found. */
      SDKERR_NO_AUDIODEVICE_ISFOUND = 16,
      /** 17, No video device found. */
      SDKERR_NO_VIDEODEVICE_ISFOUND = 17,
      /** 18, API calls too frequently. */
      SDKERR_TOO_FREQUENT_CALL = 18,
      /** 19, User can't be assigned with new privilege. */
      SDKERR_FAIL_ASSIGN_USER_PRIVILEGE = 19,
      /** 20, The current meeting doesn't support the feature. */
      SDKERR_MEETING_DONT_SUPPORT_FEATURE = 20,
      /** 21, The current user is not the presenter. */
      SDKERR_MEETING_NOT_SHARE_SENDER = 21,
      /** 22, There is no sharing. */
      SDKERR_MEETING_YOU_HAVE_NO_SHARE = 22,
      /** 23, Incorrect ViewType parameters. */
      SDKERR_MEETING_VIEWTYPE_PARAMETER_IS_WRONG = 23,
      /** 24, Annotation is disabled. */
      SDKERR_MEETING_ANNOTATION_IS_OFF = 24,
      /** 25, Current OS doesn't support the setting. */
      SDKERR_SETTING_OS_DONT_SUPPORT = 25,
      /** 26, Email login is disable */
      SDKERR_EMAIL_LOGIN_IS_DISABLED = 26,
      /** 27, Computer doesn't meet the minimum requirements to use virtual background feature.*/
      SDKERR_HARDWARE_NOT_MEET_FOR_VB = 27,
      /** 28, Need process disclaimer. */
      SDKERR_NEED_USER_CONFIRM_RECORD_DISCLAIMER = 28,
      /** 29, There is no raw data of sharing. */
      SDKERR_NO_SHARE_DATA = 29,
      SDKERR_SHARE_CANNOT_SUBSCRIBE_MYSELF = 30,
    }

    /**
     * @alias ZoomAPPLocale
     * @readonly
     * @enum {Number}
     */
    export enum ZoomAPPLocale {
      ZNSDK_APP_Locale_Default = 0,
      ZNSDK_APP_Locale_CN = 1,
    }

    /**
     * @alias ZoomAuthResult
     * @readonly
     * @enum {Number}
     */
    export enum ZoomAuthResult {
      /** 0, Authentication is successful */
      AUTHRET_SUCCESS = 0,
      /** 1, The key or secret to authenticate is empty */
      AUTHRET_KEYORSECRETEMPTY = 1,
      /** 2, The key or secret to authenticate is wrong */
      AUTHRET_KEYORSECRETWRONG = 2,
      /** 3, The user account does not support */
      AUTHRET_ACCOUNTNOTSUPPORT = 3,
      /** 4, The user account is not enabled for SDK */
      AUTHRET_ACCOUNTNOTENABLESDK = 4,
      /** 5, Unknown error */
      AUTHRET_UNKNOWN = 5,
      /** 6, Service is busy */
      AUTHRET_SERVICE_BUSY = 6,
      /** 7, Initial status */
      AUTHRET_NONE = 7,
      /** 8, Time out */
      AUTHRET_OVERTIME = 8,
      /** 9, Network issues */
      AUTHRET_NETWORKISSUE = 9,
      /** 10, Account does not support this SDK version */
      AUTHRET_CLIENT_INCOMPATIBLE = 10,
      /** 11, The jwt token to authenticate is wrong */
      AUTHRET_JWTTOKENWRONG = 11,
    }

    /**
     * @alias ZoomLanguageType
     * @readonly
     * @enum {Number}
     */
    export enum ZoomLanguageType {
      /** 0, No use of the custom resource. */
      CustomizedLanguage_None = 0,
      /** 1, Use the specified file path to assign the custom resource. */
      CustomizedLanguage_FilePath = 1,
      /** 2, Use the specified content to assign the custom resource. */
      CustomizedLanguage_Content = 2,
    }

    /**
     * @alias ZoomLoginStatus
     * @readonly
     * @enum {Number}
     */
    export enum ZoomLoginStatus {
      /** 0, Not login */
      LOGIN_IDLE = 0,
      /** 1, Login in processing */
      LOGIN_PROCESSING = 1,
      /** 2, Login success */
      LOGIN_SUCCESS = 2,
      /** 3, Login failed */
      LOGIN_FAILED = 3,
    }

    /**
     * @alias ZoomLoginType
     * @readonly
     * @enum {Number}
     */
    export enum ZoomLoginType {
      /** 0, Unknown type. */
      LoginType_Unknown = 0,
      /** 1, Login with work mailbox. */
      LoginType_Email = 1,
      /** 2, Login with SSO token. */
      LoginType_SSO = 2
    }

    /**
     * @alias ZoomMeetingStatus
     * @readonly
     * @enum {Number}
     */
    export enum ZoomMeetingStatus {
      /** 0, Idle status, no meeting running */
      MEETING_STATUS_IDLE = 0,
      /** 1, Connecting meeting server status */
      MEETING_STATUS_CONNECTING = 1,
      /** 2, Waiting for host to start meeting */
      MEETING_STATUS_WAITINGFORHOST = 2, //
      /** 3, Meeting is ready, in meeting status */
      MEETING_STATUS_INMEETING = 3,
      /** 4, Disconnecting meeting server status */
      MEETING_STATUS_DISCONNECTING = 4,
      /** 5, Reconnecting meeting server status */
      MEETING_STATUS_RECONNECTING = 5,
      /** 6, Meeting connection error */
      MEETING_STATUS_FAILED = 6,
      /** 7, Meeting is ended */
      MEETING_STATUS_ENDED = 7,
      /** 8, Unknown status. */
      MEETING_STATUS_UNKNOW = 8,
      /** 9, Meeting is locked to prevent the further participants to join the meeting. */
      MEETING_STATUS_LOCKED = 9,
      /** 10, Meeting is open and participants can join the meeting. */
      MEETING_STATUS_UNLOCKED = 10,
      /** 11, Participants who join the meeting before the start are in the waiting room. */
      MEETING_STATUS_IN_WAITING_ROOM = 11,
      /** 12, Upgrade the attendees to panelist in webinar. */
      MEETING_STATUS_WEBINAR_PROMOTE = 12,
      /** 13, Downgrade the attendees from the panelist. */
      MEETING_STATUS_WEBINAR_DEPROMOTE = 13,
      /** 14, Join the breakout room. */
      MEETING_STATUS_JOIN_BREAKOUT_ROOM = 14,
      /** 15, Leave the breakout room. */
      MEETING_STATUS_LEAVE_BREAKOUT_ROOM = 15,
      /** 16, Audio is ready. */
      MEETING_STATUS_AUDIO_READY = 16,
      /** 17, Other meeting is in progress. */
      MEETING_STATUS_OTHER_MEETING_INPROGRESS = 17,
      /** 18, Waiting for the additional secret key */
      MEETING_STATUS_WAITING_EXTERNAL_SESSION_KEY = 18
    }

    /**
     * @alias ZoomSDKUserType
     * @readonly
     * @enum {Number}
     */
    export enum ZoomSDKUserType {
      /** 100, Type of ordinary user who needs to login. */
      ZNSDK_UT_NORMALUSER = 100, // Type of ordinary user who needs to login.
      /** 101, Start meeting without login. */
      ZNSDK_UT_WITHOUT_LOGIN = 101
    }

    /**
     * @alias ZoomUserType
     * @readonly
     * @enum {Number}
     */
    export enum ZoomUserType {
      /** 0, API user. */
      ZoomUserType_APIUSER = 0,
      /** 1, User logged in with email. */
      ZoomUserType_EMAIL_LOGIN = 1,
      /** 2, User logged in with Facebook. */
      ZoomUserType_FACEBOOK = 2,
      /** 3, User logged in with Google. */
      ZoomUserType_GoogleOAuth = 3,
      /** 4, User logged in with SSO. */
      ZoomUserType_SSO = 4,
      /** 5, User of unknown type. */
      ZoomUserType_Unknown = 5
    }

    /**
     * @alias LeaveMeetingCmd
     * @readonly
     * @enum {Number}
     */
    export enum LeaveMeetingCmd {
      /** 0, Leave meeting */
      ZNLEAVE_MEETING = 0,
      /** 1, End meeting */
      ZNEND_MEETING = 1
    }

    /**
     * @alias MeetingType
     * @readonly
     * @enum {Number}
     */
    export enum MeetingType {
      /** 0, For initialization. */
      MEETING_TYPE_NONE = 0,
      /** 1, Ordinary meeting. */
      MEETING_TYPE_NORMAL = 1,
      /** 2, Webinar. */
      MEETING_TYPE_WEBINAR = 2,
      /** 3, Breakout meeting. */
      MEETING_TYPE_BREAKOUTROOM = 3
    }

    /**
     * @alias ZoomMeetingFailCode
     * @readonly
     * @enum {Number}
     */
    export enum ZoomMeetingFailCode {
      /** 0, Start meeting successfully. */
      MEETING_SUCCESS = 0,
      /** 1, Network error. */
      MEETING_FAIL_NETWORK_ERR = 1,
      /** 2, Reconnect error. */
      MEETING_FAIL_RECONNECT_ERR = 2,
      /** 3, Multi-media Router error. */
      MEETING_FAIL_MMR_ERR = 3,
      /** 4, Password is wrong. */
      MEETING_FAIL_PASSWORD_ERR = 4,
      /** 5, Session error. */
      MEETING_FAIL_SESSION_ERR = 5,
      /** 6, Meeting is over. */
      MEETING_FAIL_MEETING_OVER = 6,
      /** 7, Meeting has not begin. */
      MEETING_FAIL_MEETING_NOT_START = 7,
      /** 8, Meeting does not exist. */
      MEETING_FAIL_MEETING_NOT_EXIST = 8,
      /** 9, The capacity of meeting is full. */
      MEETING_FAIL_MEETING_USER_FULL = 9,
      /** 10, The client is incompatible. */
      MEETING_FAIL_CLIENT_INCOMPATIBLE = 10,
      /** 11, The Multi-media router is not founded.  */
      MEETING_FAIL_NO_MMR = 11,
      /** 12, The meeting is locked. */
      MEETING_FAIL_CONFLOCKED = 12,
      /** 13, The meeting is failed because of the restriction by the same account. */
      MEETING_FAIL_MEETING_RESTRICTED = 13,
      /** 14, The meeting is restricted by the same account while the attendee is allowed to join before the host. */
      MEETING_FAIL_MEETING_RESTRICTED_JBH = 14,
      /** 15, Unable to send web request. */
      MEETING_FAIL_CANNOT_EMIT_WEBREQUEST = 15,
      /** 16, The token is expired. */
      MEETING_FAIL_CANNOT_START_TOKENEXPIRE = 16,
      /** 17, Video hardware or software error. */
      SESSION_VIDEO_ERR = 17,
      /** 18, Audio autostart error. */
      SESSION_AUDIO_AUTOSTARTERR = 18,
      /** 19, The number of webinar registered has reached the upper limit. */
      MEETING_FAIL_REGISTERWEBINAR_FULL = 19,
      /** 20, Register webinar with the role of webinar host. */
      MEETING_FAIL_REGISTERWEBINAR_HOSTREGISTER = 20,
      /** 21, Register webinar with the role of panelist member. */
      MEETING_FAIL_REGISTERWEBINAR_PANELISTREGISTER = 21,
      /** 22, Register webinar with the denied email. */
      MEETING_FAIL_REGISTERWEBINAR_DENIED_EMAIL = 22,
      /** 23, Webinar request to login. */
      MEETING_FAIL_ENFORCE_LOGIN = 23,
      /** 24, Invalid for Windows SDK. */
      MEETING_FAIL_ZC_CERTIFICATE_CHANGED = 24,
      /** 27, Vanity conference ID does not exist. */
      MEETING_FAIL_VANITY_NOT_EXIST = 27,
      /** 28, Join webinar with the same email. */
      MEETING_FAIL_JOIN_WEBINAR_WITHSAMEEMAIL = 28, // Join webinar with the same email.
      /** 29, Meeting settings is not allowed to start a meeting. */
      MEETING_FAIL_DISALLOW_HOST_MEETING = 29,
      /** 50, Failed to write configure file. */
      MEETING_FAIL_WRITE_CONFIG_FILE = 50,
      /** 60, Forbidden to join the internal meeting. */
      MEETING_FAIL_FORBID_TO_JOIN_INTERNAL_MEETING = 60,
      /** 61, Removed by the host. */
      MEETING_FAIL_REMOVEDBYHOST = 61,
      /** 62, Forbidden to join meeting. */
      MEETING_FAIL_HOST_DISALLOW_OUTSIDE_USER_JOIN = 62,
    }

    /**
     * @alias MeetingEndReason
     * @readonly
     * @enum {Number}
     */
    export enum MeetingEndReason {
      /** 0, For initialization. */
      EndMeetingReason_None = 0,
      /** 1, Kicked by host. */
      EndMeetingReason_KickByHost = 1,
      /** 2, Ended by host. */
      EndMeetingReason_EndByHost = 2,
      /** 3, JBH times out. */
      EndMeetingReason_JBHTimeOut = 3,
      /** 4, No attendee. */
      EndMeetingReason_NoAttendee = 4,
      /** 5, Host starts another meeting. */
      EndMeetingReason_HostStartAnotherMeeting = 5,
      /** 6, Free meeting times out. */
      EndMeetingReason_FreeMeetingTimeOut = 6,
      /** 7, Network is broken. */
      EndMeetingReason_NetworkBroken = 7,
    }

    /**
     * @alias ZoomMeetingUIFloatVideoType
     * @readonly
     * @enum {Number}
     */
    export enum ZoomMeetingUIFloatVideoType {
      FLOATVIDEO_List = 0,
      FLOATVIDEO_Small = 1,
      FLOATVIDEO_Large = 2,
      FLOATVIDEO_Minimize = 3,
    }

    /**
     * @alias SDKViewType
     * @readonly
     * @enum {Number}
     */
    export enum SDKViewType {
      /** 0, Primary displayer. */
      ZNSDK_FIRST_VIEW = 0,
      /** 1, Secondary displayer. */
      ZNSDK_SECOND_VIEW = 1,
      ZNSDK_SEND_SHARE_VIEW = 2,
    }

    /**
     * @alias ZoomMeetingButtonType
     * @readonly
     * @enum {Number}
     */
    export enum ZoomMeetingButtonType {
      ButtonType_ToolBarParticipant = 0,
      ButtonType_ToolBarShare = 1,
      ButtonType_ToolBarInvite = 2,
    }

    /**
     * @alias ZoomMeetingUIViewType
     * @readonly
     * @enum {Number}
     */
    export enum ZoomMeetingUIViewType {
      MEETINGUI_FIRST_MONITOR = 0,
      MEETINGUI_SECOND_MONITOR = 1,
    }

    /**
     * @alias ZoomAnnotationToolType
     * @readonly
     * @enum {Number}
     */
    export enum ZoomAnnotationToolType {
      /** 0, Switch to mouse cursor. */
      ANNOTOOL_NONE_DRAWING = 0,
      /** 1, Pen. */
      ANNOTOOL_PEN = 1,
      /** 2, Highlighter. */
      ANNOTOOL_HIGHLIGHTER = 2,
      /** 3, A straight line changes automatically in pace with the mouse cursor. */
      ANNOTOOL_AUTO_LINE = 3,
      /** 4, A rectangle changes automatically in pace with the mouse cursor. */
      ANNOTOOL_AUTO_RECTANGLE = 4,
      /** 5, An ellipse changes automatically in pace with the mouse cursor. */
      ANNOTOOL_AUTO_ELLIPSE = 5,
      /** 6, An arrow changes automatically in pace with the mouse cursor. */
      ANNOTOOL_AUTO_ARROW = 6,
      /** 7, A filled rectangle. */
      ANNOTOOL_AUTO_RECTANGLE_FILL = 7,
      /** 8, A filled ellipse. */
      ANNOTOOL_AUTO_ELLIPSE_FILL = 8,
      /** 9, Laser pointer. */
      ANNOTOOL_SPOTLIGHT = 9,
      /** 10, An arrow showing the name of whom click on the sharing content. */
      ANNOTOOL_ARROW = 10,
      /** 11, earser */
      ANNOTOOL_ERASER = 11,
      /** 12, Insert a textbox in order to input letters. */
      ANNOTOOL_TEXTBOX = 12,
      /** 13, Select the annotations. */
      ANNOTOOL_PICKER = 13,
      /** 14, A fair rectangle changes automatically in pace with the mouse cursor. */
      ANNOTOOL_AUTO_RECTANGLE_SEMI_FILL = 14,
      /** 15, A fair ellipse changes automatically in pace with the mouse cursor. */
      ANNOTOOL_AUTO_ELLIPSE_SEMI_FILL = 15,
      /** 16, A line with double-arrow. */
      ANNOTOOL_AUTO_DOUBLE_ARROW = 16,
      /** 17, An unfilled rhombus. */
      ANNOTOOL_AUTO_DIAMOND = 17,
      /** 18, A fixed-size arrow for marking. */
      ANNOTOOL_AUTO_STAMP_ARROW = 18,
      /** 19, A sign marking that something is correct. */
      ANNOTOOL_AUTO_STAMP_CHECK = 19,
      /** 20, A sign marking that something is wrong. */
      ANNOTOOL_AUTO_STAMP_X = 20,
      /** 21, A star for marking. */
      ANNOTOOL_AUTO_STAMP_STAR = 21,
      /** 22, A heart for marking. */
      ANNOTOOL_AUTO_STAMP_HEART = 22,
      /** 23, A sign for interrogation. */
      ANNOTOOL_AUTO_STAMP_QM = 23,
    }

    /**
     * @alias ZoomAnnotationClearType
     * @readonly
     * @enum {Number}
     */
    export enum ZoomAnnotationClearType {
      /** 0, Clear all annotations. */
      ANNOCLEAR_ALL = 0,
      /** 1, Clear only your own annotations. */
      ANNOCLEAR_SELF = 1,
      /** 2, Clear only the others' annotations. */
      ANNOCLEAR_OTHER = 2,
    }

    /**
     * @alias ZoomMeetingAudioStatus
     * @readonly
     * @enum {Number}
     */
    export enum ZoomMeetingAudioStatus {
      /** 0, Initialization. */
      Audio_None = 0,
      /** 1, Muted status. */
      Audio_Muted = 1,
      /** 2, Muted by the host. */
      Audio_UnMuted = 2,
      /** 3, Muted by the host. */
      Audio_Muted_ByHost = 3,
      /** 4, Unmuted by the host. */
      Audio_UnMuted_ByHost = 4,
      /** 5, The host mutes all. */
      Audio_MutedAll_ByHost = 5,
      /** 6, The host unmutes all. */
      Audio_UnMutedAll_ByHost = 6,
    }

    /**
     * @alias ZoomMeetingVideoStatus
     * @readonly
     * @enum {Number}
     */
    export enum ZoomMeetingVideoStatus {
      /** 0, Video is on. */
      Video_ON = 0,
      /** 1, Video is off. */
      Video_OFF = 1,
    }

    /**
     * @alias ConnectionQuality
     * @readonly
     * @enum {Number}
     */
    export enum ConnectionQuality {
      /** 0, Unknown connection status */
      Conn_Quality_Unknow = 0,
      /** 1, The connection quality is very poor. */
      Conn_Quality_Very_Bad = 1,
      /** 2, The connection quality is poor. */
      Conn_Quality_Bad = 2,
      /** 3, The connection quality is not good. */
      Conn_Quality_Not_Good = 3,
      /** 4, The connection quality is normal. */
      Conn_Quality_Normal = 4,
      /** 5, The connection quality is good. */
      Conn_Quality_Good = 5,
      /** 6, The connection quality is excellent. */
      Conn_Quality_Excellent = 6,
    }

    /**
     * @alias ZoomH323deviceType
     * @readonly
     * @enum {Number}
     */
    export enum ZoomH323deviceType {
      /** 0, Unknown device, only for initialization. */
      H323DeviceType_Unknown = 0,
      /** 1, H.323 device. */
      H323DeviceType_H323 = 1,
      /** 2, SIP device. */
      H323DeviceType_SIP = 2,
      /** 3, H.323 device and SIP device. */
      H323DeviceType_BOTH = 3,
    }

    /**
     * @alias ZoomH323CalloutStatus
     * @readonly
     * @enum {Number}
     */
    export enum ZoomH323CalloutStatus {
      /** 0, Used only for initialization. */
      H323Callout_Unknown = 0,
      /** 1, Call successfully. */
      H323Callout_Success = 1,
      /** 2, Bell during the call. */
      H323Callout_Ring = 2,
      /** 3, Call timeout. */
      H323Callout_Timeout = 3,
      /** 4, Call fails. */
      H323Callout_Failed = 4,
      /** 5, Busy */
      H323Callout_Busy = 5,
      /** 6, Decline */
      H323Callout_Decline = 6,
    }

    /**
     * @alias MeetingReminderType
     * @readonly
     * @enum {Number}
     */
    export enum MeetingReminderType {
      /** 0, host */
      MeetingReminderType_CanFreeTrial = 0,
      MeetingReminderType_CanUpgradeAccount = 1,
      /** 2, guest */
      MeetingReminderType_GuestReminder = 2,
      MeetingReminderType_UpgradeSuccess = 3,
      MeetingReminderType_UpgradeFailed = 4,
      MeetingReminderType_None = 5,
    }

    /**
     * @alias RawDataMemoryMode
     * @readonly
     * @enum {Number}
     */
    export enum RawDataMemoryMode {
      RawDataMemoryMode_Stack = 0,
      RawDataMemoryMode_Heap = 1,
    }

    /**
     * @alias RawDataResolution
     * @readonly
     * @enum {Number}
     */
    export enum RawDataResolution {
      RawDataResolution_90 = 0,
      RawDataResolution_180 = 1,
      RawDataResolution_360 = 2,
      RawDataResolution_720 = 3,
      RawDataResolution_1080 = 4,
    }

    /**
     * @alias ZNVideoStatus
     * @readonly
     * @enum {Number}
     */
    export enum ZNVideoStatus {
      /** 0, Video is on. */
      ZN_Video_ON = 0,
      /** 1, Video is off. */
      ZN_Video_OFF = 1,
    }

    /**
     * @alias SDKRawDataError
     * @readonly
     * @enum {Number}
     */
    export enum SDKRawDataError {
      SDKRawDataError_SUCCESS = 0,
      SDKRawDataError_UNINITIALIZED = 1,
      SDKRawDataError_MALLOC_FAILED = 2,
      SDKRawDataError_WRONGUSAGE = 3,
      SDKRawDataError_INVALID_PARAM = 4,
      SDKRawDataError_NOT_IN_MEETING = 5,
      SDKRawDataError_NO_LICENSE = 6,
      SDKRawDataError_VIDEO_MODULE_NOT_READY = 7,
      SDKRawDataError_VIDEO_MODULE_ERROR = 8,
      SDKRawDataError_VIDEO_DEVICE_ERROR = 9,
      SDKRawDataError_NO_VIDEO_DATA = 10,
      SDKRawDataError_SHARE_MODULE_NOT_READY = 11,
      SDKRawDataError_SHARE_MODULE_ERROR = 12,
      SDKRawDataError_NO_SHARE_DATA = 13,
      SDKRawDataError_AUDIO_MODULE_NOT_READY = 14,
      SDKRawDataError_AUDIO_MODULE_ERROR = 15,
      SDKRawDataError_NO_AUDIO_DATA = 16,
    }

    /**
     * @alias ZNShareStatus
     * @readonly
     * @enum {Number}
     */
    export enum ZNShareStatus {
      /** 0, For initialization. */
      ZN_Sharing_None = 0,
      /** 1, Begin to share by the user himself. */
      ZN_Sharing_Self_Send_Begin = 1,
      /** 2, Stop sharing by the user. */
      ZN_Sharing_Self_Send_End = 2,
      /** 3, Others begin to share. */
      ZN_Sharing_Other_Share_Begin = 3,
      /** 4, Others stop sharing. */
      ZN_Sharing_Other_Share_End = 4,
      /** 5, View the sharing of others. */
      ZN_Sharing_View_Other_Sharing = 5,
      /** 6, Pause sharing. */
      ZN_Sharing_Pause = 6,
      /** 7, Resume sharing. */
      ZN_Sharing_Resume = 7,
      /** 8, Sharing content changes. */
      ZN_Sharing_ContentTypeChange = 8,
      /** 9, The current user begins to share the sounds of computer audio. */
      ZN_Sharing_SelfStartAudioShare = 9,
      /** 10, The current user stops to share the sounds of computer audio. */
      ZN_Sharing_SelfStopAudioShare = 10,
      /** 11, Other user begins to share the sounds of computer audio. */
      ZN_Sharing_OtherStartAudioShare = 11,
      /** 12, Other user stops to share the sounds of computer audio. */
      ZN_Sharing_OtherStopAudioShare = 12,
    }

    /**
     * @alias SettingTabPage
     * @readonly
     * @enum {Number}
     */
    export enum SettingTabPage {
      /** 0, General setting page. */
      ZN_SettingTabPage_General = 0,
      /** 1, Audio setting page. */
      ZN_SettingTabPage_Audio = 1,
      /** 2, Video setting page. */
      ZN_SettingTabPage_Video = 2,
    }

    /**
     * @alias ZNSDKMinimizeUIMode
     * @readonly
     * @enum {Number}
     */
    export enum ZNSDKMinimizeUIMode {
      /** 0, For initialization. */
      ZN_MinimizeUIMode_NONE = 0,
      /** 1, Minimized mode for sharing. */
      ZN_MinimizeUIMode_SHARE = 1,
      /** 2, Minimized mode for video. */
      ZN_MinimizeUIMode_VIDEO = 2,
      /** 3, Minimized mode for speaking. */
      ZN_MinimizeUIMode_ACTIVESPEAKER = 3,
    }

    /**
     * @alias SMSVerificationCodeErr
     * @readonly
     * @enum {Number}
     */
    export enum SMSVerificationCodeErr {
      /** 0, For initialization. */
      ZNSMSVerificationCodeErr_Unknown = 0,
      /** 1, Success. */
      ZNSMSVerificationCodeErr_Success = 1,
      /** 2, Send SMS Failed. */
      ZNSMSVerificationCodeErr_Retrieve_SendSMSFailed = 2,
      /** 3, Invalid phone number. */
      ZNSMSVerificationCodeErr_Retrieve_InvalidPhoneNum = 3,
      /** 4, The phone number is already bound. */
      ZNSMSVerificationCodeErr_Retrieve_PhoneNumAlreadyBound = 4,
      /** 5, Send phone number too frequently. */
      ZNSMSVerificationCodeErr_Retrieve_PhoneNumSendTooFrequent = 5,
      /** 6, Verification code is incorrect. */
      ZNSMSVerificationCodeErr_Verify_CodeIncorrect = 6,
      /** 7, Verification code is expired. */
      ZNSMSVerificationCodeErr_Verify_CodeExpired = 7,
      /** 8, Unknown error for verification. */
      ZNSMSVerificationCodeErr_Verify_UnknownError = 8,
    }

    /**
     * @alias SDKInviteDlgTabPage
     * @readonly
     * @enum {Number}
     */
    export enum SDKInviteDlgTabPage {
      /** 0, Invite by Email' tab page */
      SDK_INVITEDLG_TAB_EMAILCONTACT = 0,
      /** 1, Invite by Phone' tab pag */
      SDK_INVITEDLG_TAB_PHONECONTACT = 1,
      /** 2, Invite a Room System' tab page */
      SDK_INVITEDLG_TAB_ROOMSYSTEM = 2,
    }

    /**
     * @alias SDKH323TabPage
     * @readonly
     * @enum {Number}
     */
    export enum SDKH323TabPage {
      /** 0, Dial In' sub-tab page under Room System invitation tab page */
      SDK_INVITEDLG_H323_DIALIN = 0,
      /** 1, Call Out' sub-tab page under Room System invitation tab page */
      SDK_INVITEDLG_H323_CALLOUT = 1,
    }

    /**
     * @alias SettingsNetWorkType
     * @readonly
     * @enum {Number}
     */
    export enum SettingsNetWorkType {
      /** 0, Wired LAN */
      ZNSETTINGS_NETWORK_WIRED = 0,
      /** 1, WIFI */
      ZNSETTINGS_NETWORK_WIFI = 1,
      /** 2, PPP */
      ZNSETTINGS_NETWORK_PPP = 2,
      /** 3, 3G */
      ZNSETTINGS_NETWORK_3G = 3,
      /** 4, Others */
      ZNSETTINGS_NETWORK_OTHERS = 4,
      /** 5, Unknown network. */
      ZNSETTINGS_NETWORK_UNKNOWN = -1,
    }

    /**
     * @alias SettingConnectionType
     * @readonly
     * @enum {Number}
     */
    export enum SettingConnectionType {
      /** 0, Cloud connection. */
      ZNSETTINGS_CONNECTION_TYPE_CLOUD = 0,
      /** 1, Direct connection. */
      ZNSETTINGS_CONNECTION_TYPE_DIRECT = 1,
      /** -1, Unknown connection. */
      ZNSETTINGS_CONNECTION_TYPE_UNKNOWN = -1,
    }

    /**
     * @alias SDKCustomizedStringType
     * @readonly
     * @enum {Number}
     */
    export enum SDKCustomizedStringType {
      /** 0, The new string must end up with "%s" so that the menu item can show correctly. This type is used to define a string to replace the menu item ON %S on live streaming. */
      SDK_Customized_LiveStream_MenuString_LiveOn_String = 0,
      /** 1, The new string must end up with "%s" so that the menu item can show correctly. This type is used to define a string to replace the menu item VIEW STREAM ON %S on live streaming. */
      SDK_Customized_LiveStream_MenuString_LiveView_String = 1,
      /** 2, The new string must be a pure string so that it can show correctly. This type is used to define a string to replace the menu item STOP LIVE STREAM on live streaming. */
      SDK_Customized_LiveStream_MenuString_LiveStop_String = 2,
      /** 3, The new string must be a pure string so that it can show correctly. This type is used to define a string to replace the menu item COPY STREAMING LINK on live streaming. */
      SDK_Customized_LiveStream_MenuString_CopyURL_String = 3,
      /** 4, The new string must be a pure string so that it can show correctly. This type is used to define a string to replace the title of the meeting video UI. */
      SDK_Customized_Title_App = 4,
      /** 5, The new string must be the same format as "Zoom Participant ID: %s Meeting ID: %s" so that it can show correctly. This type is used to define a string to replace the title of the meeting video UI. */
      SDK_Customized_Title_ZoomVideo = 5,
      /** 6, The new string must be the same format as "Zoom Participant ID: %s  %d-Minutes Meeting ID:%s" so that it can show correctly. This type is used to define a string to replace the title of the meeting video UI when the user is free user and in view-only status. */
      SDK_Customized_Title_FreeZoomVideo = 6,
      /** 7, The new string must be the same format as "Zoom %d-Minutes Meeting ID: %s" so that it can show correctly. This type is used to define a string to replace the title of the meeting video UI when the user is free user and in view-only status. */
      SDK_Customized_Title_ViewOnly_FreeZoomVideo = 7,
    }

    /**
     * @alias SDKCustomizedURLType
     * @readonly
     * @enum {Number}
     */
    export enum SDKCustomizedURLType {
      /** 0, Set the custom help URL in the virtual background tab page. */
      ZN_SDKCustomizedURL_VITRULBG_HELP = 0,
      /** 1, Set the custom Learn More URL in the virtual background tab page. */
      ZN_SDKCustomizedURL_VITRULBG_LEARN_MORE = 1,
      /** 2, Set the Support URL in the meeting. */
      ZN_SDKCustomizedURL_SUPPORTURL = 2,
    }

    /**
     * @alias ZNRequiredInfoType
     * @readonly
     * @enum {Number}
     */
    export enum ZNRequiredInfoType {
      /** 0, Initialization. */
      ZNREQUIRED_INFO_TYPE_NONE = 0,
      /** 1, The user needs to enter the password when joins the meeting. Via the InputMeetingPasswordAndScreenName() to specify the password information. */
      ZNREQUIRED_INFO_TYPE_Password = 1,
      /** 2, If the password is invalid, the user needs to re-enter it. Via the InputMeetingPasswordAndScreenName() to specify the password information. */
      ZNREQUIRED_INFO_TYPE_Password4WrongPassword = 2,
      /** 3, The user needs to enter the screen name and the password,via the InputMeetingPasswordAndScreenName() to specify the necessary information. */
      ZNREQUIRED_INFO_TYPE_PasswordAndScreenName = 3,
      /** 4, The user needs to enter the screen name. Via the InputMeetingScreenName() to specify the screen name information. */
      ZNREQUIRED_INFO_TYPE_ScreenName = 4,
      /** 5, The user needs to enter the screen name and the meeting id,via the InputMeetingMeetingIDAndScreenName() to specify the necessary information. */
      ZNREQUIRED_INFO_TYPE_MeetingIDAndScreenName = 5,
    }

    /**
     * @alias ZNWebinarNeedRegisterType
     * @readonly
     * @enum {Number}
     */
    export enum ZNWebinarNeedRegisterType {
      /** 0, Initialization. */
      ZNWebinarReg_NONE = 0,
      /** 1, Register webinar account by URL. */
      ZNWebinarReg_By_Register_Url = 1,
      /** 2, Register webinar account by email and the screen name. */
      ZNWebinarReg_By_Email_and_DisplayName = 2,
    }

    /**
     * @alias ZNAudioCallbackActionInfo
     * @readonly
     * @enum {Number}
     */
    export enum ZNAudioCallbackActionInfo {
      /** 0, For initialization. */
      ZNACTION_INFO_NONE = 0,
      /** 1, Choose audio device because no audio device is connected yet. */
      ZNACTION_INFO_CHOOSE_AUDIO_DEVICE_NOAUDIODEVICECONNECTTED = 1,
      /** 2, Choose audio device because there is an error in the connected computer audio device. */
      ZNACTION_INFO_CHOOSE_AUDIO_DEVICE_COMPUTERAUDIODEVICEERROR = 2,
      /** 3, Choose audio device because there is an error in the connected phone call device. */
      ZNACTION_INFO_CHOOSE_AUDIO_DEVICE_PHONECALLDEVICEERROR = 3,
      /** 4, Need to join voip. */
      ZNACTION_INFO_NEED_JOIN_VOIP = 4,
      /** 5, Mute or unmute some user's audio */
      ZNACTION_INFO_MUTE_UNMUTE_AUDIO = 5,
      /** 6, Show audio setting window. */
      ZNACTION_INFO_SHOW_AUDIO_SETTING_WINDOW = 6,
    }

    /**
     * @alias ZNRecordingStatus
     * @readonly
     * @enum {Number}
     */
    export enum ZNRecordingStatus {
      /** 0, Start recording on local computer or on cloud. */
      ZNRecording_Start = 0,
      /** 1, Stop recording on local computer or on cloud. */
      ZNRecording_Stop = 1,
      /** 2, There is no space to store for both local and cloud recording. */
      ZNRecording_DiskFull = 2,
      /** 3, Pause recording on local or on cloud. */
      ZNRecording_Pause = 3,
      /** 4, Connecting, only for cloud recording. */
      ZNRecording_Connecting = 4,
    }

    /**
     * @alias ZNSDKUserInfoType
     * @readonly
     * @enum {Number}
     */
    export enum ZNSDKUserInfoType {
      ZN_REAL_USERINFO = 0,
      ZN_FAKE_USERINFO = 1,
    }

    /**
     * @alias ZNCustomizedLanguageType
     * @readonly
     * @enum {Number}
     */
    export enum ZNCustomizedLanguageType {
      /** 0, No use of the custom resource. */
      ZN_CustomizedLanguage_None = 0,
      /** 1, Use the specified file path to assign the custom resource. */
      ZN_CustomizedLanguage_FilePath = 1,
      /** 2, Use the specified content to assign the custom resource. */
      ZN_CustomizedLanguage_Content = 2,
    }

    /**
     * @alias ZoomSDKRawDataType
     * @readonly
     * @enum {Number}
     */
    export enum ZoomSDKRawDataType {
      RAW_DATA_TYPE_VIDEO = 0,
      RAW_DATA_TYPE_SHARE = 1,
    }

    /**
     * @alias RawDataStatus
     * @readonly
     * @enum {Number}
     */
    export enum RawDataStatus {
      RawData_On = 0,
      RawData_Off = 1,
    }

    /**
     * @alias ZoomSDKVideoRenderMode
     * @readonly
     * @enum {Number}
     */
    export enum ZoomSDKVideoRenderMode {
      SDKVideoRenderMode_None = 0,
      SDKVideoRenderMode_Auto = 1,
      SDKVideoRenderMode_D3D11EnableFLIP = 2,
      SDKVideoRenderMode_D3D11 = 3,
      SDKVideoRenderMode_D3D9 = 4,
      SDKVideoRenderMode_GDI = 5,
    }

    /**
     * @alias SDKRawDataMemoryMode
     * @readonly
     * @enum {Number}
     */
    export enum SDKRawDataMemoryMode {
      SDKRawDataMemoryModeStack = 0,
      SDKRawDataMemoryModeHeap = 1,
    }

    /**
     * @alias ZoomSDKVideoCaptureMethod
     * @readonly
     * @enum {Number}
     */
    export enum ZoomSDKVideoCaptureMethod {
      ZoomSDKVideoCaptureMethod_None = 0,
      ZoomSDKVideoCaptureMethod_Auto = 1,
      ZoomSDKVideoCaptureMethod_DirectSHow = 2,
      ZoomSDKVideoCaptureMethod_MediaFoundation = 3,
    }

    /**
     * @alias ZoomSDKRenderPostProcessing
     * @readonly
     * @enum {Number}
     */
    export enum ZoomSDKRenderPostProcessing {
      ZoomSDKRenderPostProcessing_None = 0,
      ZoomSDKRenderPostProcessing_Auto = 1,
      ZoomSDKRenderPostProcessing_Enable = 2,
      ZoomSDKRenderPostProcessing_Disable = 3,
    }

    /**
     * @alias ZoomSDKVideoHardwareEncodeType
     * @readonly
     * @enum {Number}
     */
    export enum ZoomSDKVideoHardwareEncodeType {
      /** 0, Mac platform only has this option */
      VIDEO_HARDWARE_ENCODE_RECEIVING = 0,
      VIDEO_HARDWARE_ENCODE_SENDING = 1,
      VIDEO_HARDWARE_ENCODE_PROCESSING = 2,
    }

    /**
     * @alias ZoomSDKEchoCancelLationLevel
     * @readonly
     * @enum {Number}
     */
    export enum ZoomSDKEchoCancelLationLevel {
      ZN_SDK_ECHO_CANCELLATION_DEFAULT = 0,
      ZN_SDK_ECHO_CANCELLATION_AGGRESSIVE = 1,
    }

    /**
     * @alias LoginFailReason
     * @readonly
     * @enum {Number}
     */
    export enum LoginFailReason {
      LoginFail_None = 0,
      LoginFail_EmailLoginDisable = 1,
      LoginFail_UserNotExist = 2,
      LoginFail_WrongPassword = 3,
      LoginFail_AccountLocked = 4,
      LoginFail_SDKNeedUpdate = 5,
      LoginFail_TooManyFailedAttempts = 6,
      LoginFail_SMSCodeError = 7,
      LoginFail_SMSCodeExpired = 8,
      LoginFail_PhoneNumberFormatInValid = 9,
      LoginFail_LoginTokenInvalid = 10,
      LoginFail_OtherIssue = 100,
    }

    /**
     * @alias DirectShareStatus
     * @readonly
     * @enum {Number}
     */
    export enum DirectShareStatus {
      /** 0, Only for initialization. */
      DirectShare_Unknown = 0,
      /** 1, Waiting for enabling the direct sharing. */
      DirectShare_Connecting = 1,
      /** 2, In direct sharing mode. */
      DirectShare_In_Direct_Share_Mode = 2,
      /** 3, End the direct sharing. */
      DirectShare_Ended = 3,
      /** 4, Re-enter the meeting ID/paring code. */
      DirectShare_Need_MeetingID_Or_PairingCode = 4,
      /** 5, Network error. Please try again later. */
      DirectShare_NetWork_Error = 5,
      /** 6, Other errors. Mainly occur in SIP call mode. */
      DirectShare_Other_Error = 6,
      DirectShare_WrongMeetingID_Or_SharingKey = 7,
      /** 8, Please input new paring code. */
      DirectShare_InputNewParingCode = 8,
      /** 9, Prepare to share data. */
      DirectShare_Prepared = 9,
    }

    /**
     * @alias FreeMeetingNeedUpgradeType
     * @readonly
     * @enum {Number}
     */
    export enum FreeMeetingNeedUpgradeType {
      /** 0, Initialization. */
      FreeMeetingNeedUpgradeType_NONE = 0,
      /** 1, It is necessary for administrator to upgrade the free meeting. */
      FreeMeetingNeedUpgradeType_BY_ADMIN = 1,
      /** 2, Upgrade the free meeting by the gift link. */
      FreeMeetingNeedUpgradeType_BY_GIFTURL = 2,
    }

    /**
     * @alias AudioType
     * @readonly
     * @enum {Number}
     */
    export enum AudioType {
      /** 0, Normal audio type. */
      AUDIOTYPE_NONE = 0,
      /** 1, In VoIP mode. */
      AUDIOTYPE_VOIP = 1,
      /** 2, In telephone mode. */
      AUDIOTYPE_PHONE = 2,
      /** 3, Unknown mode. */
      AUDIOTYPE_UNKNOW = 3,
    }

    /**
     * @alias UserRole
     * @readonly
     * @enum {Number}
     */
    export enum UserRole {
      /** 0, For initialization. */
      USERROLE_NONE = 0,
      /** 1, Role of the host. */
      USERROLE_HOST = 1,
      /** 2, Role of co-host. */
      USERROLE_COHOST = 2,
      /** 3, Role of the panelist, valid only in webinar. */
      USERROLE_PANELIST = 3,
      /** 4, Host role in breakout room. */
      USERROLE_BREAKOUTROOM_MODERATOR = 4,
      /** 5, Role of attendee. */
      USERROLE_ATTENDEE = 5,
    }

    /**
     * @alias RequiredInfoType
     * @readonly
     * @enum {Number}
     */
    export enum RequiredInfoType {
      /** 0, Initialization. */
      REQUIRED_INFO_TYPE_NONE = 0,
      /** 1, The user needs to enter the password when joins the meeting. Via the InputMeetingPasswordAndScreenName() to specify the password information. */
      REQUIRED_INFO_TYPE_Password = 1,
      /** 2, If the password is invalid, the user needs to re-enter it. Via the InputMeetingPasswordAndScreenName() to specify the password information. */
      REQUIRED_INFO_TYPE_Password4WrongPassword = 2,
      /** 3, The user needs to enter the screen name and the password,via the InputMeetingPasswordAndScreenName() to specify the necessary information. */
      REQUIRED_INFO_TYPE_PasswordAndScreenName = 3,
      /** 4, The user needs to enter the screen name. Via the InputMeetingPasswordAndScreenName() to specify the screen name information. */
      REQUIRED_INFO_TYPE_ScreenName = 4,
      /** 5, The user needs to enter the screen name and the meeting id,via the InputMeetingMeetingIDAndScreenName() to specify the necessary information. */
      REQUIRED_INFO_TYPE_MeetingIDAndScreenName = 5,
    }

    /**
     * @alias WebinarNeedRegisterType
     * @readonly
     * @enum {Number}
     */
    export enum WebinarNeedRegisterType {
      /** 0, Initialization. */
      WebinarReg_NONE = 0,
      /** 1, Register webinar account by URL. */
      WebinarReg_By_Register_Url = 1,
      /** 2, Register webinar account by email and the screen name. */
      WebinarReg_By_Email_and_DisplayName = 2,
    }

    /**
     * @alias PremeetingAPIResult
     * @readonly
     * @enum {Number}
     */
    export enum PremeetingAPIResult {
      /** 0, API returns unknown error. */
      PREMETAPIRET_UNKNOW = 0,
      /** 1, Calls API successfully. */
      PREMETAPIRET_SUCCESS = 1,
    }


  }



}