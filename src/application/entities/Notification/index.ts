import { Content } from "./content";

export interface NotificationProps {
  recipentId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps; 

  constructor(props: NotificationProps) {
    this.props = props;
  }

  public set recipentId(recipentId: string) {
    this.props.recipentId = recipentId;
  }

  public get recipentId(): string {
    return this.props.recipentId;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public set readAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
