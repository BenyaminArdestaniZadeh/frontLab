"use client";
import { ThemeToggle } from "@/features/ThemeToggle";
import {
  Accordion,
  Button,
  Drawer,
  Flex,
  Grid,
  Modal,
  MultiCheckbox,
  Pagination,
  Select,
  SingleCheckbox,
  Switch,
  TextArea,
  TextField,
  Tooltip,
  Typography,
} from "@/shared/ui";

import { useState } from "react";

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const selectOptions = [
    { key: "test key1", value: "test value1" },
    { key: "test key2", value: "test value2" },
    { key: "test key3", value: "test value3" },
    { key: "test key4", value: "test value4" },
    { key: "test key5", value: "test value5" },
  ];
  return (
    <main className="p-4">
      <div>
        <ThemeToggle />
        <Flex flexDirection={{ mobile: "column", laptop: "row" }} gap={"32px"}>
          <TextField label="Email" placeholder="Email" />
          <TextArea label="Message" placeholder="Message" />
          <Select
            placeholder="select options"
            label="select options"
            options={selectOptions}
          />
          <SingleCheckbox label="داستان" />
          <MultiCheckbox options={selectOptions} />
          <Switch label="Switch" />
        </Flex>
        <Grid
          width={"100%"}
          columns={3}
          marginTop={"32px"}
          gap={"32px"}
          borderTop={"2px solid red"}
          paddingTop={"16px"}
        >
          <TextField label="Email" placeholder="Email" />
          <TextArea label="Message" placeholder="Message" />
          <Select
            placeholder="select options"
            label="select options"
            options={selectOptions}
          />
          <SingleCheckbox label="داستان" />
          <MultiCheckbox options={selectOptions} />
          <Switch label="Switch" />
          <Accordion title="تست تست ">
            <Flex>
              <Typography variant="body1"> تست تست </Typography>
            </Flex>
          </Accordion>
          <Pagination current={1} total={100} onPageChange={() => {}} />
          <Tooltip content="تست تست">
            <Button onClick={handleOpen}>Open Modal</Button>
          </Tooltip>
          <Modal open={open} onClose={handleClose} title="تست تست ">
            <Flex>
              <Typography variant="body1"> تست تست </Typography>
            </Flex>
          </Modal>
          <Drawer
            isOpen={open}
            onClose={handleClose}
            title="تست تست "
            slideDirection="right"
          >
            <Flex>
              <Typography variant="body1"> تست تست </Typography>
            </Flex>
          </Drawer>
        </Grid>
      </div>
    </main>
  );
}
