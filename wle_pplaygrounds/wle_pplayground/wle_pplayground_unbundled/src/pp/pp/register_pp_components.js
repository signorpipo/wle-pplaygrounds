import { AddPPToWindowComponent, AddWLToWindowComponent, AdjustHierarchyPhysXScaleComponent, AnalyticsManagerComponent, AudioManagerComponent, BenchmarkMaxPhysXComponent, BenchmarkMaxVisibleTrianglesComponent, CADisplayLeaderboardComponent, CharacterCollisionSystemComponent, ClearConsoleOnXRSessionStartComponent, ConsoleVRToolComponent, CopyHandTransformComponent, CopyHeadTransformComponent, CopyPlayerTransformComponent, CopyReferenceSpaceTransformComponent, DebugArrayFunctionsPerformanceAnalyzerComponent, DebugFunctionsPerformanceAnalyzerComponent, DebugManagerComponent, DebugPPArrayCreationPerformanceAnalyzerComponent, DebugPPFunctionsPerformanceAnalyzerComponent, DebugTransformComponent, DebugWLComponentsFunctionsPerformanceAnalyzerComponent, DebugWLFunctionsPerformanceAnalyzerComponent, EasyLightAttenuationComponent, EasyLightColorComponent, EasyMeshColorComponent, EasyScaleComponent, EasySetTuneTargeetGrabComponent, EasySetTuneTargetChildNumberComponent, EasyTextColorComponent, EasyTransformComponent, EasyTuneImportVariablesComponent, EasyTuneToolComponent, EnableDebugComponent, EnableToolComponent, FingerCursorComponent, GamepadControlSchemeComponent, GamepadMeshAnimatorComponent, GetDefaultResourcesComponent, GetSceneObjectsComponent, GrabbableComponent, GrabberHandComponent, InitConsoleVRComponent, InitEasyTuneVariablesComponent, InputManagerComponent, MuteEverythingComponent, ObjectPoolManagerComponent, OverlapCursorComponent, PPGatewayComponent, PlayerLocomotionComponent, SaveManagerComponent, ScaleOnSpawnComponent, SetActiveComponent, SetHandLocalTransformComponent, SetHeadLocalTransformComponent, SetPlayerHeightComponent, SetTrackedHandJointLocalTransformComponent, ShowFPSComponent, ShowXRButtonsComponent, SpatialAudioListenerComponent, SwitchHandObjectComponent, ToolCursorComponent, TrackedHandDrawAllJointsComponent, TrackedHandDrawJointComponent, TrackedHandDrawSkinComponent, VirtualGamepadComponent, VisualManagerComponent } from "../index.js";

export function registerPPComponents(engine) {
    engine.registerComponent(
        AddPPToWindowComponent,
        AddWLToWindowComponent,
        AdjustHierarchyPhysXScaleComponent,
        AnalyticsManagerComponent,
        AudioManagerComponent,
        BenchmarkMaxPhysXComponent,
        BenchmarkMaxVisibleTrianglesComponent,
        CADisplayLeaderboardComponent,
        CharacterCollisionSystemComponent,
        ClearConsoleOnXRSessionStartComponent,
        ConsoleVRToolComponent,
        CopyHandTransformComponent,
        CopyHeadTransformComponent,
        CopyReferenceSpaceTransformComponent,
        CopyPlayerTransformComponent,
        DebugPPArrayCreationPerformanceAnalyzerComponent,
        DebugArrayFunctionsPerformanceAnalyzerComponent,
        DebugFunctionsPerformanceAnalyzerComponent,
        DebugManagerComponent,
        DebugPPFunctionsPerformanceAnalyzerComponent,
        DebugTransformComponent,
        DebugWLComponentsFunctionsPerformanceAnalyzerComponent,
        DebugWLFunctionsPerformanceAnalyzerComponent,
        EasyLightAttenuationComponent,
        EasyLightColorComponent,
        EasyMeshColorComponent,
        EasyScaleComponent,
        EasySetTuneTargeetGrabComponent,
        EasySetTuneTargetChildNumberComponent,
        EasyTextColorComponent,
        EasyTransformComponent,
        EasyTuneImportVariablesComponent,
        EasyTuneToolComponent,
        EnableDebugComponent,
        EnableToolComponent,
        OverlapCursorComponent,
        FingerCursorComponent,
        GamepadControlSchemeComponent,
        GamepadMeshAnimatorComponent,
        GetDefaultResourcesComponent,
        GetSceneObjectsComponent,
        GrabbableComponent,
        GrabberHandComponent,
        InitConsoleVRComponent,
        InitEasyTuneVariablesComponent,
        InputManagerComponent,
        MuteEverythingComponent,
        ObjectPoolManagerComponent,
        PPGatewayComponent,
        PlayerLocomotionComponent,
        SaveManagerComponent,
        ScaleOnSpawnComponent,
        SetActiveComponent,
        SetHandLocalTransformComponent,
        SetHeadLocalTransformComponent,
        SetPlayerHeightComponent,
        SetTrackedHandJointLocalTransformComponent,
        ShowFPSComponent,
        ShowXRButtonsComponent,
        SpatialAudioListenerComponent,
        SwitchHandObjectComponent,
        ToolCursorComponent,
        TrackedHandDrawAllJointsComponent,
        TrackedHandDrawJointComponent,
        TrackedHandDrawSkinComponent,
        VirtualGamepadComponent,
        VisualManagerComponent
    );
}