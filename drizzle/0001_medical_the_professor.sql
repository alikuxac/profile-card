CREATE TABLE `donate_groups` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `project_groups` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE `donates` ADD `group_id` text REFERENCES donate_groups(id);--> statement-breakpoint
ALTER TABLE `projects` ADD `group_id` text REFERENCES project_groups(id);