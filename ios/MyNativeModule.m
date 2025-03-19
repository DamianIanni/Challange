//
//  MyNativeModule.m
//  Challange
//
//  Created by Damian Ianni on 17/3/2025.
//


// MyNativeModule.m
//  MyNativeModule.m
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import <UserNotifications/UserNotifications.h>
#import <UIKit/UIKit.h>

@interface RCT_EXTERN_MODULE(MyNativeModule, NSObject)

@end

@implementation MyNativeModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getMessage:(RCTResponseSenderBlock)callback)
{
  NSString *message = @"Este es el mensaje desde el módulo nativo";
  callback(@[message]);
}

RCT_EXPORT_METHOD(showNotification:(NSString *)title message:(NSString *)message)
{
  // Crear contenido de la notificación
  UNMutableNotificationContent *content = [UNMutableNotificationContent new];
  content.title = [NSString stringWithFormat:@"%s %@", "New document by", title];
  content.body = message;
  content.sound = UNNotificationSound.defaultSound;

  // Crear el trigger de la notificación
  UNTimeIntervalNotificationTrigger *trigger = [UNTimeIntervalNotificationTrigger triggerWithTimeInterval:3 repeats:NO];

  // Crear la solicitud de la notificación
  UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:@"messageNotification" content:content trigger:trigger];

  // Agregar la notificación
  [[UNUserNotificationCenter currentNotificationCenter] addNotificationRequest:request withCompletionHandler:^(NSError * _Nullable error) {
    if (error) {
      RCTLogError(@"Error al enviar la notificación: %@", error.localizedDescription);
    }
  }];
}

RCT_EXPORT_METHOD(share:(NSString *)message)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    UIViewController *rootViewController = UIApplication.sharedApplication.delegate.window.rootViewController;

    UIActivityViewController *activityVC = [[UIActivityViewController alloc] initWithActivityItems:@[message] applicationActivities:nil];

    [rootViewController presentViewController:activityVC animated:YES completion:nil];
  });
}

@end
