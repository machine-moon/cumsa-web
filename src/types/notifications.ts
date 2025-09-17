export type NotificationGroup = {
  key: string;
  name: string;
  fields: string[];
};

export type SubscriptionRecord = {
  groupKey: string;
  subscribed: boolean;
};

export type SubscriptionMap = Record<string, boolean>;

export type SendAnnouncementPayload = {
  groupKey: string;
  message: string;
};
