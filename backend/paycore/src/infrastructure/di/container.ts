import { UserService } from "../../application/services/UserService";
import { BunPasswordService } from "../adapters/crypto/BunPasswordService";
import { UserSupabaseRepository } from "../adapters/db/userSupabaseRepository";
import { UserController } from "../adapters/http/controllers/userController";
import { supabase } from "../config/supabase";

const passwordService = new BunPasswordService()
const userRepository = new UserSupabaseRepository(supabase);
const userService = new UserService(userRepository, passwordService);
export const userController = new UserController(userService)